namespace ProjectBE.Dtos
{
    public class ShowtimeDetailDto
    {
        public int ShowtimeId { get; set; }
        public string MovieTitle { get; set; }
        public string MovieImageUrl { get; set; }
        public string MovieRating { get; set; }
        public string CinemaName { get; set; }
        public string ScreeningRoomName { get; set; }
        public string ShowtimeDate { get; set; } // Định dạng dd/MM/yyyy
        public string ShowtimeTime { get; set; } // Định dạng HH:mm
        public decimal BasePrice { get; set; }
        public List<SeatDto> Seats { get; set; } = new List<SeatDto>();
    }
}
