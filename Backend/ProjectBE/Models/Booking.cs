using System;
using System.Collections.Generic;

namespace ProjectBE.Models;

public partial class Booking
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int? ShowtimeId { get; set; }

    public DateTime? BookingTime { get; set; }

    public decimal? TotalAmount { get; set; }

    public virtual Showtime? Showtime { get; set; }

    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();

    public virtual User? User { get; set; }
}
