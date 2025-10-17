import { Link } from 'react-router-dom';
import useSearchMovies from '../hooks/useSearchMovies';

interface SearchSuggestionsProps {
    query: string;
    onClose: () => void; // Hàm để đóng dropdown khi click vào một gợi ý
}

export default function SearchSuggestions({ query, onClose }: SearchSuggestionsProps) {
    const { movies, isLoading, error } = useSearchMovies(query);

    if (isLoading) {
        return <div className="p-4 text-gray-500">Đang tìm...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">Lỗi: {error}</div>;
    }

    if (movies.length === 0) {
        return <div className="p-4 text-gray-500">Không tìm thấy kết quả.</div>;
    }

    return (
        <div className="py-2">
            {movies.slice(0, 5).map((movie) => ( // Chỉ hiển thị 5 gợi ý đầu tiên
                // SỬA LẠI: Dùng <Link> thay cho <button>
                <Link
                    key={movie.id}
                    to={`/movie-detail/${movie.id}`} // Link trỏ thẳng đến trang chi tiết
                    onClick={onClose} // Đóng dropdown sau khi click
                    className="flex items-center gap-4 p-3 hover:bg-gray-100 transition-colors"
                >
                    <img src={movie.imageUrl} alt={movie.title} className="w-12 h-16 object-cover rounded" />
                    <div>
                        <p className="font-semibold text-gray-800">{movie.title}</p>
                        <p className="text-sm text-gray-500">{movie.genres.map(g => g.name).join(', ')}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}