import { useEffect, useState } from "react"
import { CinemaType } from "../types/cinema";
import { getCinema } from "../services/apiServices";

const useCinema = () => {
    const [cinemas, setCinemas] = useState<CinemaType[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCinemas = async () => {
            try {
                setIsLoading(true);
                const data = await getCinema();
                setCinemas(data);
            } catch (error) {
                if (error instanceof Error) setError(error.message)
                else setError('Đã xảy ra lỗi không xác định')
            } finally {
                setIsLoading(false);
            }
        }
        fetchCinemas()
    }, [])

    return { cinemas, isLoading, error }
}

export default useCinema