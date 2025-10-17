import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMovie } from '../hooks/useMovie';
import ShowtimesModal from './ShowTimesModal';

export default function MovieDetail() {
    const { id } = useParams<{ id: string }>();
    const numericId = id ? Number(id) : null;
    const { movie, isLoading, error } = useMovie(numericId);

    const [isModalOpen, setIsModalOpen] = useState(false);

    if (isLoading) return <div className="py-16 text-center text-xl">Đang tải...</div>;
    if (error) return <div className="py-16 text-center text-xl text-red-600">Lỗi: {error}</div>;
    if (!movie) return <div className="py-16 text-center text-xl">Không tìm thấy phim!</div>;

    const shouldShowBuyButton = movie.statusName?.trim().toLowerCase() !== 'sắp chiếu';

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="mb-8">
                        <div className="flex items-center gap-2 text-sm">
                            <Link to="/" className="text-gray-600 hover:text-gray-900">Trang chủ</Link>
                            <span className="text-gray-400">&gt;</span>
                            <span className="text-blue-600 font-medium">{movie.title}</span>
                        </div>
                    </nav>
                    <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12">
                        <div className="relative">
                            <div className="sticky top-8">
                                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl">
                                    <div className="absolute top-4 left-4 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-bold text-lg z-10">{movie.rating}</div>
                                    <img src={movie.imageUrl} alt={movie.title} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{movie.title}</h1>
                                <p className="text-gray-700 leading-relaxed text-lg">{movie.description}</p>
                            </div>

                            {/* PHẦN THÔNG TIN CHI TIẾT ĐÃ ĐƯỢC BỔ SUNG */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-[140px_1fr] gap-4 items-start">
                                        <span className="font-bold text-gray-900 uppercase tracking-wide">Thể loại:</span>
                                        <span className="text-gray-700">
                                            {movie.genres.map((genre, index) => (
                                                <span key={genre.id}>
                                                    <Link to={`/genre/${genre.id}`} className="text-blue-600 hover:underline">
                                                        {genre.name}
                                                    </Link>
                                                    {index < movie.genres.length - 1 && ', '}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-[140px_1fr] gap-4 items-start">
                                        <span className="font-bold text-gray-900 uppercase tracking-wide">Thời lượng:</span>
                                        <span className="text-gray-700">{movie.duration}</span>
                                    </div>
                                    <div className="grid grid-cols-[140px_1fr] gap-4 items-start">
                                        <span className="font-bold text-gray-900 uppercase tracking-wide">Ngày khởi chiếu:</span>
                                        <span className="text-gray-700">{new Date(movie.releaseDate).toLocaleDateString('vi-VN')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                {shouldShowBuyButton ? (
                                    <button onClick={() => setIsModalOpen(true)} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg text-xl">MUA VÉ</button>
                                ) : (
                                    <div className="w-full bg-gray-400 text-white font-bold py-4 rounded-lg text-xl text-center cursor-not-allowed">SẮP CHIẾU</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gọi component modal và truyền props */}
            <ShowtimesModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                movieId={movie.id}
                movieInfo={{
                    title: movie.title,
                    genres: movie.genres,
                    duration: movie.duration,
                }}
            />
        </>
    );
}