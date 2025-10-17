import { Genre } from "./genre";

export interface Movie {
    id: number;
    title: string;
    genres: Genre[];
    genreId: number;
    duration: string;
    rating: string;
    imageUrl: string;
    description: string;
    releaseDate: string;
    director: string;
    cast: string;
    statusName: string;
}

