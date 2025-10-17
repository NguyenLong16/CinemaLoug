import { Showtime } from "./showtime";

export interface CinemaShowtime {
    cinemaId: number,
    cinemaName: string,
    showtimes: Showtime[]
}