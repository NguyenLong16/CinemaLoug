using System;
using System.Collections.Generic;

namespace ProjectBE.Models;

public partial class ScreeningRoom
{
    public int Id { get; set; }

    public int? CinemaId { get; set; }

    public string? Name { get; set; }

    public int? Capacity { get; set; }

    public virtual Cinema? Cinema { get; set; }

    public virtual ICollection<Seat> Seats { get; set; } = new List<Seat>();

    public virtual ICollection<Showtime> Showtimes { get; set; } = new List<Showtime>();
}
