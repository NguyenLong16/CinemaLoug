using System;
using System.Collections.Generic;

namespace ProjectBE.Models;

public partial class Showtime
{
    public int Id { get; set; }

    public int? MovieId { get; set; }

    public int? ScreeningRoomId { get; set; }

    public DateTime? Showtime1 { get; set; }

    public decimal? BasePrice { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual Movie? Movie { get; set; }

    public virtual ScreeningRoom? MovieNavigation { get; set; }
}
