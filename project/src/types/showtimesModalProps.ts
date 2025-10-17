import { Genre } from "./genre";

export interface ShowtimesModalProps {
    isOpen: boolean;
    onClose: () => void;
    movieId: number | null;
    movieInfo: {
        title: string;
        genres: Genre[];
        duration: string;
    };
}