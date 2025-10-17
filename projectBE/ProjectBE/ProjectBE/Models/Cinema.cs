using System;
using System.Collections.Generic;

namespace ProjectBE.Models;

public partial class Cinema
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Location { get; set; }

    public virtual ICollection<ScreeningRoom> ScreeningRooms { get; set; } = new List<ScreeningRoom>();
}
