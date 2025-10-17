import { Genre } from "./genre";

export interface MovieCardProps {
    id: number;
    title: string;
    genres: Genre[];
    duration: string;
    rating: string;
    imageUrl: string;
    showBuyButton: boolean;
}