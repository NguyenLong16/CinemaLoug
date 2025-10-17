import { useState, useEffect } from 'react';
import { Movie } from '../types/movie';
import { getMovieById } from '../services/apiServices';

export const useMovie = (id: number | null) => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id || isNaN(id)) {
            setIsLoading(false);
            return;
        }

        const fetchMovie = async () => {
            try {
                setIsLoading(true);
                const data = await getMovieById(id);
                setMovie(data);
            } catch (err) {
                if (err instanceof Error) setError(err.message);
                else setError('Đã có lỗi không xác định xảy ra');
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovie();
    }, [id]);

    return { movie, isLoading, error };
};