using System;
using System.Collections.Generic;

namespace ProjectBE.Models;

public partial class Ticket
{
    public int Id { get; set; }

    public int? BookingId { get; set; }

    public int? SeatId { get; set; }

    public decimal? Price { get; set; }

    public virtual Booking? Booking { get; set; }

    public virtual Seat? Seat { get; set; }
}
