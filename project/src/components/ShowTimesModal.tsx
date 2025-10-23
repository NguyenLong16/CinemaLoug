import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useShowtime } from '../hooks/useShowtime';
import { ShowtimesModalProps } from '../types/showtimesModalProps';
import { useAuth } from '../context/AuthContext';
// Định nghĩa kiểu dữ liệu cho suất chiếu đã chọn
interface SelectedShowtime {
    cinema: string;
    time: string;
    date: string;
}

export default function ShowtimesModal({ isOpen, onClose, movieId, movieInfo }: ShowtimesModalProps) {
    // State để quản lý modal xác nhận (nằm bên trong component này)
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [selectedShowtime, setSelectedShowtime] = useState<SelectedShowtime | null>(null);

    // Gọi hook để lấy dữ liệu lịch chiếu, chỉ khi modal chính được mở
    const { showtimeData, isLoading, error } = useShowtime(isOpen && !isConfirmationOpen ? movieId : null);
    const { isAuthenticated } = useAuth()

    const navigate = useNavigate()


    // Khi người dùng click chọn suất chiếu
    const handleShowtimeClick = (cinemaName: string, time: string, date: string) => {
        setSelectedShowtime({ cinema: cinemaName, time, date });
        setIsConfirmationOpen(true); // Bật modal xác nhận
    };

    // Khi người dùng đóng modal xác nhận (quay lại màn hình chọn lịch)
    const closeConfirmationAndGoBack = () => {
        setIsConfirmationOpen(false);
        setSelectedShowtime(null);
    };

    // Nếu không có lệnh mở modal, không render gì cả
    if (!isOpen) return null;

    const genreNames = movieInfo.genres.map(g => g.name).join(', ');

    if (isConfirmationOpen && selectedShowtime) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" onClick={closeConfirmationAndGoBack} />
                <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl">
                    <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Xác nhận thông tin đặt vé</h3>
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full" onClick={closeConfirmationAndGoBack}>
                            <X size={24} />
                        </button>
                    </div>
                    <div className="p-8">
                        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">{movieInfo.title}</h2>
                        <div className="bg-gray-50 rounded-xl p-6 mb-8 border">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-medium">Rạp chiếu</p>
                                    <p className="text-lg font-bold text-gray-900">{selectedShowtime.cinema}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-medium">Ngày chiếu</p>
                                    <p className="text-lg font-bold text-gray-900">{selectedShowtime.date}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 font-medium">Giờ chiếu</p>
                                    <p className="text-lg font-bold text-gray-900">{selectedShowtime.time}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() =>
                                isAuthenticated
                                    ? navigate('/seats', { state: { selectedShowtime } }) // If true (logged in)
                                    : navigate('/login', { state: { from: `/seats` } })
                            }
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-lg">
                            TIẾP TỤC
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
                    <div>
                        <h3 className="text-2xl font-bold">{movieInfo.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{genreNames} • {movieInfo.duration}</p>
                    </div>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto">
                    {isLoading && <p className="text-center">Đang tải lịch chiếu...</p>}
                    {error && <p className="text-center text-red-500">Lỗi: {error}</p>}
                    {!isLoading && !error && showtimeData.length === 0 && (
                        <p className="text-center text-gray-500">Hôm nay không có suất chiếu cho phim này.</p>
                    )}
                    {!isLoading && !error && showtimeData.map(cinema => (
                        <div key={cinema.cinemaId} className="bg-gray-50 p-5 rounded-xl border">
                            <h4 className="font-bold text-xl mb-4">{cinema.cinemaName}</h4>
                            <div className="flex flex-wrap gap-3">
                                {cinema.showtimes.map(showtime => (
                                    <button
                                        key={showtime.id}
                                        onClick={() => handleShowtimeClick(cinema.cinemaName, showtime.time, showtime.date)}
                                        className="px-5 py-3 font-semibold text-blue-700 bg-white border-2 rounded-lg hover:bg-blue-600 hover:text-white"
                                    >
                                        {showtime.time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="sticky bottom-0 bg-gray-100 border-t px-6 py-4 rounded-b-2xl mt-auto">
                    <p className="text-sm text-gray-600 text-center">Chọn một suất chiếu để tiếp tục</p>
                </div>
            </div>
        </div>
    );
}