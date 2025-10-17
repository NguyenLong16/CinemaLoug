import { Link, useParams } from "react-router-dom"
import useMovieByGenre from "../hooks/useMovieByGenre";
import MovieCard from "./MovieCard";
import { useMemo } from "react";

function SearchGenre() {
    const { genreId } = useParams<{ genreId: string }>()
    const numericId = genreId ? Number(genreId) : null;
    const { movies, isLoading, error } = useMovieByGenre(numericId);

    const genreName = useMemo(() => {
        if (movies.length > 0 && numericId) {
            const curruntGenre = movies[0].genres.find(g => g.id === numericId)
            return curruntGenre ? curruntGenre.name : 'Không xác định'
        }

        return 'Đang tải...'
    }, [movies, numericId])

    if (isLoading) {
        return <div className="py-16 text-center text-xl">Đang tải phim...</div>
    }

    if (error) {
        return <div className="py-16 text-center text-xl text-red-600">Lỗi: {error}</div>
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Breadcrumb Navigation */}
                    <nav className="mb-8">
                        <div className="flex items-center gap-2 text-sm">
                            <Link to="/" className="text-gray-600 hover:text-gray-900">Trang chủ</Link>
                            <span className="text-gray-400">&gt;</span>
                            <span className="text-blue-600 font-medium">Thể loại: {genreName}</span>
                        </div>
                    </nav>

                    {/* Hiển thị kết quả hoặc thông báo không tìm thấy */}
                    {movies.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {movies.map(movie => (
                                <MovieCard
                                    key={movie.id}
                                    id={movie.id}
                                    title={movie.title}
                                    genres={movie.genres}
                                    genreId={movie.genreId}
                                    duration={movie.duration}
                                    rating={movie.rating}
                                    imageUrl={movie.imageUrl}
                                    showBuyButton={movie.statusName?.trim().toLowerCase() !== 'sắp chiếu'}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="col-span-4 text-center text-gray-500">Không tìm thấy phim nào thuộc thể loại này.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default SearchGenre;