import { Genre } from "./genre";

export interface MovieCardProps {
    id: number;
    title: string;
    genres: Genre[];
    // genreId: number
    duration: string;
    rating: string;
    imageUrl: string;
    showBuyButton: boolean;
}