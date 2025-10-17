import { useEffect, useState } from "react"
import { Movie } from "../types/movie"
import { getMovieByGenre } from "../services/apiServices"

function useMovieByGenre(genreId: number | null) {
    const [movies, setMovie] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!genreId || isNaN(genreId)) {
            setIsLoading(false)
            return
        }
        const searchGenre = async () => {
            try {
                setIsLoading(true)
                const data = await getMovieByGenre(genreId)
                setMovie(data)
            } catch (err) {
                if (err instanceof Error) setError(err.message)
                else setError('Đã có lỗi xảy ra')
            } finally {
                setIsLoading(false)
            }
        }
        searchGenre()
    }, [genreId])

    return { movies, isLoading, error }
}

export default useMovieByGenre