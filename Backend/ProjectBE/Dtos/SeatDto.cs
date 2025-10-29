namespace ProjectBE.Dtos
{
    public class SeatDto
    {
        public int Id { get; set; }
        public string Row { get; set; }
        public int SeatNumber { get; set; }
        public string SeatTypeName { get; set; }
        public decimal Surcharge { get; set; }
        public bool IsBooked { get; set; }
    }
}
