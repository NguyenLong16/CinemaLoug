using System;
using System.Collections.Generic;

namespace ProjectBE.Models;

public partial class Seat
{
    public int Id { get; set; }

    public int? ScreeningRoomId { get; set; }

    public int? SeatTypeId { get; set; }

    public string? Row { get; set; }

    public int? SeatNumber { get; set; }

    public virtual ScreeningRoom? ScreeningRoom { get; set; }

    public virtual SeatType? SeatType { get; set; }

    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
