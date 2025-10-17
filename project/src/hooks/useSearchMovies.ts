import { useEffect, useState } from "react";
import { Movie } from "../types/movie";
import { searchMovies } from "../services/apiServices";

const useSearchMovies = (query: string | null) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!query) {
            setMovies([])
            return
        }

        const fetchSearchResults = async () => {
            try {
                setIsLoading(true);
                const data = await searchMovies(query)
                setMovies(data)
            } catch (error) {
                if (error instanceof Error) setError(error.message)
                else setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.')
            } finally {
                setIsLoading(false);
            }
        }
        fetchSearchResults();
    }, [query])

    return { movies, isLoading, error }
}

export default useSearchMovies;