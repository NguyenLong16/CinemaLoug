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

        
    }
}
