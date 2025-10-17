import { useEffect, useState } from "react";
import { TestTypeGenre } from "../types/test";
import { getTestGenres } from "../services/apiServices";

const useTestGenre = () => {
    const [genre, setGenre] = useState<TestTypeGenre[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGenre = async () => {
            try {
                setIsLoading(true);
                const data = await getTestGenres()
                setGenre(data);
            } catch (err) {
                if (err instanceof Error) setError(err.message);
                else setError('Đã có lỗi không xác định xảy ra.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchGenre();
    }, []);

    return { genre, isLoading, error };
}

export default useTestGenre;