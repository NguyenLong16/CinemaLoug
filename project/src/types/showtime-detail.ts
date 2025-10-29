import { Seat } from "./seat";

export interface ShowtimeDetail {
    showtimeId: number;
    movieTitle: string;
    movieImageUrl: string;
    movieRating: string;
    cinemaName: string;
    screeningRoomName: string;
    showtimeDate: string;
    showtimeTime: string;
    basePrice: number;
    seats: Seat[]
}