using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectBE.Dtos;
using ProjectBE.Models;

namespace ProjectBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowtimeController : ControllerBase
    {

        private readonly CinemaContext _context;
        public ShowtimeController(CinemaContext context)
        {
            _context = context;
        }

        // Trong file Controllers/ShowtimesController.cs

        [HttpGet("movie/{movieId}")]
        public async Task<ActionResult> GetShowtimesByMovie(int movieId)
        {
           
            var rawShowtimes = await _context.Showtimes
                .Where(s => s.MovieId == movieId)
                .ToListAsync();

            if (!rawShowtimes.Any())
            {
                return Ok(new List<CinemaShowtimeDto>());
            }

            var fullShowtimes = await _context.Showtimes
                .Where(s => s.MovieId == movieId)
                .Include(s => s.MovieNavigation)
                    .ThenInclude(sr => sr.Cinema)
                .ToListAsync();
            
            var groupedByCinema = fullShowtimes
                .GroupBy(s => s.MovieNavigation.Cinema)
                .Select(group => new CinemaShowtimeDto
                {
                    CinemaId = group.Key.Id,
                    CinemaName = group.Key.Name,
                    showtimes = group.Select(s => new ShowtimeDto
                    {
                        Id = s.Id,
                        Time = s.Showtime1.HasValue ? s.Showtime1.Value.ToString("HH:mm") : "", 
                        Date = s.Showtime1.HasValue ? s.Showtime1.Value.ToString("dd/MM/yyyy") : ""
                    }).ToList()
                }).ToList();

            return Ok(groupedByCinema);
        }

        [HttpGet("detail/{showtimeId}")]
        public async Task<ActionResult<ShowtimeDetailDto>> GetShowtimeDetails(int showtimeId)
        {
            var showtime = await _context.Showtimes
        .Include(s => s.Movie)
        .Include(s => s.MovieNavigation) // Tên đúng là MovieNavigation trỏ đến ScreeningRoom
            .ThenInclude(sr => sr.Cinema)
        .Include(s => s.MovieNavigation)
            .ThenInclude(sr => sr.Seats) // Join với bảng Seats
                .ThenInclude(seat => seat.SeatType) // Từ Seat join với SeatType
        .FirstOrDefaultAsync(s => s.Id == showtimeId);

            if (showtime == null || !showtime.Showtime1.HasValue)
            {
                return NotFound("Không tìm thấy suất chiếu.");
            }

            // Lấy danh sách ID các ghế đã được đặt cho suất chiếu này
            var bookedSeatIds = await _context.Tickets
                .Where(t => t.Booking.ShowtimeId == showtimeId) // Lọc Ticket theo ShowtimeId thông qua Booking
                .Select(t => t.SeatId)
                .ToListAsync();

            var showtimeDetail = new ShowtimeDetailDto
            {
                ShowtimeId = showtime.Id,
                MovieTitle = showtime.Movie?.Title,
                MovieImageUrl = showtime.Movie?.ImageUrl,
                MovieRating = showtime.Movie?.Rating,
                CinemaName = showtime.MovieNavigation?.Cinema?.Name,
                ScreeningRoomName = showtime.MovieNavigation?.Name,
                ShowtimeDate = showtime.Showtime1.Value.ToString("dd/MM/yyyy"),
                ShowtimeTime = showtime.Showtime1.Value.ToString("HH:mm"),
                BasePrice = showtime.BasePrice ?? 0,
                Seats = showtime.MovieNavigation?.Seats
                    .OrderBy(s => s.Row).ThenBy(s => s.SeatNumber) // Sắp xếp ghế
                    .Select(s => new SeatDto
                    {
                        Id = s.Id,
                        Row = s.Row,
                        SeatNumber = s.SeatNumber ?? 0,
                        SeatTypeName = s.SeatType?.Name,
                        Surcharge = s.SeatType?.Surcharge ?? 0,
                        IsBooked = bookedSeatIds.Contains(s.Id) // Kiểm tra ghế có trong danh sách đã đặt không
                    }).ToList() ?? new List<SeatDto>()
            };

            return Ok(showtimeDetail);
        }

        
    }
}
