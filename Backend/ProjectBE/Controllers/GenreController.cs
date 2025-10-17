using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectBE.Dtos;
using ProjectBE.Models;

namespace ProjectBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly CinemaContext _context;

        public GenreController (CinemaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GenreDto>>> GetGenre()
        {
            var genres = await _context.Genres
                .Select(g => new GenreDto
                {
                    Id = g.Id,
                    Name = g.Name,
                }).ToListAsync();

            return Ok(genres);
        }
    }
}
