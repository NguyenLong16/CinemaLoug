using System;
using System.Collections.Generic;

namespace ProjectBE.Models;

public partial class Movie
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Duration { get; set; }

    public string? Rating { get; set; }

    public string? ImageUrl { get; set; }

    public string? Description { get; set; }

    public string? Director { get; set; }

    public string? Cast { get; set; }

    public string? Language { get; set; }

    public DateOnly? ReleaseDate { get; set; }

    public int? Status { get; set; }

    public virtual ICollection<Showtime> Showtimes { get; set; } = new List<Showtime>();

    public virtual MovieStatus? StatusNavigation { get; set; }

    public virtual ICollection<Genre> Genres { get; set; } = new List<Genre>();
}
