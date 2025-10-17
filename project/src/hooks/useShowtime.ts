import { useEffect, useState } from "react";
import { getShowtimeByMovie } from "../services/apiServices";
import { CinemaShowtime } from "../types/cinema-showtime";

export const useShowtime = (movieId: number | null) => {
    const [showtimeData, setShowtimeData] = useState<CinemaShowtime[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!movieId || isNaN(movieId)) {
            setIsLoading(false)
            return
        }

        const fetchShowtime = async () => {
            try {
                setIsLoading(true);
                const data = await getShowtimeByMovie(movieId)
                setShowtimeData(data)
            } catch (err) {
                if (err instanceof Error) setError(err.message)
                else setError('Đã có lỗi không xác định.')
            } finally {
                setIsLoading(false)
            }
        };
        fetchShowtime()
    }, [movieId])

    return { showtimeData, isLoading, error }
}