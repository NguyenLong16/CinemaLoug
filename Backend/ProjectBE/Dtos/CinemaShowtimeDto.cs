namespace ProjectBE.Dtos
{
    public class CinemaShowtimeDto
    {
        public int CinemaId { get; set; }
        public string CinemaName { get; set; }
        public List<ShowtimeDto> showtimes { get; set; } = new List<ShowtimeDto>();
    }
}
