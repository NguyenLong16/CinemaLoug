using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectBE.Dtos;
using ProjectBE.Models;

namespace ProjectBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly CinemaContext _context;
        public MoviesController(CinemaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieDto>>> GetMovies()
        {
            var movies = await _context.Movies
                .Include(m => m.Genres)
                .Include(m => m.StatusNavigation)
                .Select(m => new MovieDto
                {
                    Id = m.Id,
                    Title = m.Title,
                    Duration = m.Duration,
                    Rating = m.Rating,
                    ImageUrl = m.ImageUrl,
                    Description = m.Description,
                    ReleaseDate = m.ReleaseDate,
                    Genres = m.Genres.Select(g => new GenreDto { Id = g.Id, Name = g.Name }).ToList(),
                    StatusName = m.StatusNavigation != null ? m.StatusNavigation.Name : null
                })
                .ToListAsync();

            return Ok(movies);
        }

        // Lấy một phim theo ID
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<MovieDto>>> GetMovie(int id)
        {
            var movie = await _context.Movies
                .Include(m => m.Genres)
                .Include(m => m.StatusNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (movie == null)
            {
                return NotFound();
            }

            var movieDto = new MovieDto
            {
                Id = movie.Id,
                Title = movie.Title,
                Duration = movie.Duration,
                Rating = movie.Rating,
                ImageUrl = movie.ImageUrl,
                Description = movie.Description,
                ReleaseDate = movie.ReleaseDate,
                Genres = movie.Genres.Select(g => new GenreDto { Id = g.Id, Name = g.Name }).ToList(),
                StatusName = movie.StatusNavigation?.Name
            };

            return Ok(movieDto);
        }

        [HttpGet("genre/{genreId}")]

        public async Task<ActionResult<IEnumerable<MovieDto>>> GetMovieByGenre(int genreId)
        {
            var movies = await _context.Movies
                .Where(m => m.Genres.Any(g => g.Id == genreId))
                .Include(m => m.StatusNavigation)
                .Select(m => new MovieDto
                {
                    Id = m.Id,
                    Title = m.Title,
                    Duration = m.Duration,
                    Rating = m.Rating,
                    ImageUrl = m.ImageUrl,
                    Description = m.Description,
                    ReleaseDate = m.ReleaseDate,
                    Genres = m.Genres.Select(g => new GenreDto { Id = g.Id, Name = g.Name }).ToList(),
                    StatusName = m.StatusNavigation != null ? m.StatusNavigation.Name : null
                }).ToListAsync();

            return Ok(movies);
        }

        // Trong file Controllers/MoviesController.cs

        // GET: api/movies/search?query=...
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<MovieDto>>> SearchMovies([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return Ok(new List<MovieDto>());
            }

            var lowerCaseQuery = query.ToLower();

            var movies = await _context.Movies
                // SỬA LẠI LOGIC TÌM KIẾM Ở ĐÂY
                .Where(m =>
                    // 1. Tìm kiếm theo tên phim (giữ nguyên)
                    m.Title.ToLower().Contains(lowerCaseQuery) ||
                    // 2. Hoặc tìm kiếm xem có BẤT KỲ (Any) thể loại nào trong danh sách Genres
                    //    có Name chứa từ khóa tìm kiếm hay không.
                    m.Genres.Any(g => g.Name.ToLower().Contains(lowerCaseQuery))
                )
                .Include(m => m.Genres)
                .Include(m => m.StatusNavigation)
                .Select(m => new MovieDto
                {
                    Id = m.Id,
                    Title = m.Title,
                    Duration = m.Duration,
                    Rating = m.Rating,
                    ImageUrl = m.ImageUrl,
                    Description = m.Description,
                    ReleaseDate = m.ReleaseDate,
                    Genres = m.Genres.Select(g => new GenreDto { Id = g.Id, Name = g.Name }).ToList(),
                    StatusName = m.StatusNavigation != null ? m.StatusNavigation.Name : null
                })
                .ToListAsync();

            return Ok(movies);
        }
    }
}
