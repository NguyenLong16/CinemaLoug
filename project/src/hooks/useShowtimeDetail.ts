import { useEffect, useState } from "react"
import { ShowtimeDetail } from "../types/showtime-detail"
import { getShowtimeDetailsById } from "../services/apiServices"

const useShowtimeDetail = (showtimeId: number | null) => {
    const [detail, setDetail] = useState<ShowtimeDetail | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!showtimeId) {
            setIsLoading(false)
            return
        }

        const fetchShowtimeDetail = async () => {
            try {
                setIsLoading(true)
                const data = await getShowtimeDetailsById(showtimeId)
                setDetail(data)
            } catch (error) {
                if (error instanceof Error) setError(error.message)
                else setError("Lỗi không xác định")
            } finally {
                setIsLoading(false)
            }
        }
        fetchShowtimeDetail()

    }, [showtimeId])

    return { detail, isLoading, error }
}

export default useShowtimeDetail