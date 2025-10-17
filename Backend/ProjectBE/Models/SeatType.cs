using System;
using System.Collections.Generic;

namespace ProjectBE.Models;

public partial class SeatType
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public decimal? Surcharge { get; set; }

    public virtual ICollection<Seat> Seats { get; set; } = new List<Seat>();
}
