using System;
using System.Collections.Generic;

namespace ProjectBE.Models;

public partial class MovieStatus
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Movie> Movies { get; set; } = new List<Movie>();
}
