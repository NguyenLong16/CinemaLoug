namespace ProjectBE.Dtos
{
    public class MovieDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Duration { get; set; }
        public string? Rating { get; set; }
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public DateOnly? ReleaseDate { get; set; }
        public List<GenreDto> Genres { get; set; } = new List<GenreDto>();
        public string? StatusName { get; set; }
    }
}
