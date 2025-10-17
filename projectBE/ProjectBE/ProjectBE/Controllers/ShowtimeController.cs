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
                        Time = s.Showtime1.HasValue ? s.Showtime1.Value.ToString("HH:mm") : ""
                    }).ToList()
                }).ToList();

            return Ok(groupedByCinema);
        }

        // Thêm phương thức này vào bên trong lớp ShowtimesController

        // GET: api/showtimes/movie/5/dates
        // Trả về một danh sách các ngày (chỉ ngày, không có giờ) có suất chiếu cho phim
        [HttpGet("movie/{movieId}/dates")]
        public async Task<ActionResult<IEnumerable<DateTime>>> GetAvailableDates(int movieId)
        {
            var availableDates = await _context.Showtimes
                // 1. Lọc theo phim
                .Where(s => s.MovieId == movieId && s.Showtime1.HasValue)

                // 2. Chỉ lấy các suất chiếu từ hôm nay trở đi
                .Where(s => s.Showtime1.Value.Date >= DateTime.Today)

                // 3. Chỉ chọn ra phần ngày (bỏ qua giờ)
                .Select(s => s.Showtime1.Value.Date)

                // 4. Lấy các ngày duy nhất (không trùng lặp)
                .Distinct()

                // 5. Sắp xếp theo thứ tự tăng dần
                .OrderBy(date => date)

                // 6. Thực thi truy vấn
                .ToListAsync();

            return Ok(availableDates);
        }
    }
}
