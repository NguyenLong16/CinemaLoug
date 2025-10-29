import { useState, useMemo, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Monitor, Armchair, ChevronRight } from 'lucide-react';
import useShowtimeDetails from '../hooks/useShowtimeDetail';
import { Seat } from '../types/seat';
import { useAuth } from '../context/AuthContext';

export default function Seats() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const selectedShowtimeInfo = location.state?.selectedShowtime;
    const showtimeIdToFetch = selectedShowtimeInfo?.showtimeId ?? null;

    const { detail: showtimeDetails, isLoading, error } = useShowtimeDetails(showtimeIdToFetch);

    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: location.pathname, selectedShowtime: selectedShowtimeInfo }, replace: true });
        }
    }, [isAuthenticated, navigate, location.pathname, selectedShowtimeInfo]);

    const sortedSeatLayout = useMemo(() => {
        if (!showtimeDetails?.seats) return [];
        const seatMap: { [key: string]: Seat[] } = {};
        showtimeDetails.seats.forEach(seat => {
            if (!seatMap[seat.row]) seatMap[seat.row] = [];
            seatMap[seat.row].push(seat);
        });
        const sortedRows = Object.keys(seatMap).sort((a, b) => b.localeCompare(a));
        return sortedRows.map(row => ({ row, seats: seatMap[row].sort((a, b) => a.seatNumber - b.seatNumber) }));
    }, [showtimeDetails?.seats]);

    const toggleSeat = (seatId: number, isBooked: boolean) => {
        if (isBooked) return;
        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(id => id !== seatId)
                : [...prev, seatId]
        );
    };

    const getSeatClassName = (seat: Seat) => {
        const isSelected = selectedSeats.includes(seat.id);
        const seatType = seat.seatTypeName?.toLowerCase();

        const baseClasses = "font-bold flex items-center justify-center cursor-pointer transition-all duration-300 ease-out text-sm";

        let sizeClasses = "w-10 h-10 rounded-lg";
        if (seatType === 'double') {
            sizeClasses = "w-20 h-10 rounded-xl";
        }

        if (seat.isBooked) {
            return `${baseClasses} ${sizeClasses} bg-gray-300 text-gray-500 cursor-not-allowed opacity-60`;
        }

        if (isSelected) {
            if (seatType === 'vip') {
                return `${baseClasses} ${sizeClasses} bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/50 scale-110 ring-2 ring-emerald-400`;
            }
            if (seatType === 'double') {
                return `${baseClasses} ${sizeClasses} bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/50 scale-110 ring-2 ring-emerald-400`;
            }
            return `${baseClasses} ${sizeClasses} bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/50 scale-110 ring-2 ring-emerald-400`;
        }

        if (seatType === 'vip') {
            return `${baseClasses} ${sizeClasses} bg-gradient-to-br from-amber-400 to-amber-500 text-amber-900 hover:scale-110 hover:shadow-lg hover:shadow-amber-400/50`;
        }

        if (seatType === 'double') {
            return `${baseClasses} ${sizeClasses} bg-gradient-to-br from-pink-400 to-pink-500 text-white hover:scale-110 hover:shadow-lg hover:shadow-pink-400/50`;
        }

        return `${baseClasses} ${sizeClasses} bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 hover:scale-110 hover:shadow-md hover:from-slate-300 hover:to-slate-400`;
    };

    const totalPrice = useMemo(() => {
        if (!showtimeDetails) return 0;
        return selectedSeats.reduce((total, seatId) => {
            const seat = showtimeDetails.seats.find(s => s.id === seatId);
            return total + (showtimeDetails.basePrice + (seat?.surcharge ?? 0));
        }, 0);
    }, [selectedSeats, showtimeDetails]);

    const selectedSeatNames = useMemo(() => {
        if (!showtimeDetails) return '-';
        return selectedSeats
            .map(id => {
                const seat = showtimeDetails.seats.find(s => s.id === id);
                return seat ? `${seat.row}${seat.seatNumber}` : '';
            })
            .sort()
            .join(', ');
    }, [selectedSeats, showtimeDetails]);

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                <p className="text-slate-600 font-medium">Đang tải thông tin ghế...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="text-center">
                <div className="text-red-500 text-xl font-bold mb-2">Đã xảy ra lỗi</div>
                <p className="text-slate-600">{error}</p>
            </div>
        </div>
    );

    if (!showtimeDetails) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
            <p className="text-slate-600">Không tìm thấy thông tin suất chiếu.</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-6 md:py-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-6 flex items-center gap-2 text-sm">
                    <Link to="/" className="text-slate-500 hover:text-blue-600 transition-colors">Trang chủ</Link>
                    <ChevronRight size={14} className="text-slate-400" />
                    <Link to={`/movie-detail/${showtimeDetails.showtimeId}`} className="text-slate-500 hover:text-blue-600 transition-colors">Đặt vé</Link>
                    <ChevronRight size={14} className="text-slate-400" />
                    <span className="text-slate-800 font-semibold">Chọn ghế</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 md:p-8">
                            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8 pb-6 border-b border-slate-200">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 shadow-sm"></div>
                                    <span className="text-sm text-slate-700 font-medium">Thường</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 shadow-sm"></div>
                                    <span className="text-sm text-slate-700 font-medium">VIP</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-6 rounded-xl bg-gradient-to-br from-pink-400 to-pink-500 shadow-sm"></div>
                                    <span className="text-sm text-slate-700 font-medium">Ghế đôi</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm"></div>
                                    <span className="text-sm text-slate-700 font-medium">Đang chọn</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg bg-gray-300 opacity-60"></div>
                                    <span className="text-sm text-slate-700 font-medium">Đã bán</span>
                                </div>
                            </div>

                            <div className="mb-10">
                                <div className="relative">
                                    <div className="h-1.5 bg-gradient-to-r from-transparent via-slate-800 to-transparent rounded-full w-full mx-auto shadow-lg"></div>
                                    <div className="absolute inset-x-0 -bottom-6 text-center">
                                        <span className="inline-block bg-slate-800 text-white px-6 py-1.5 rounded-full text-xs font-bold tracking-wider shadow-md">
                                            MÀN HÌNH
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 space-y-3 flex flex-col items-center">
                                {sortedSeatLayout.map(({ row, seats }) => (
                                    <div key={row} className="flex items-center gap-3">
                                        <span className="w-8 text-center text-sm font-bold text-slate-600 bg-slate-100 rounded-lg py-2">{row}</span>
                                        <div className="flex gap-2">
                                            {seats.map(seat => (
                                                <button
                                                    key={seat.id}
                                                    onClick={() => toggleSeat(seat.id, seat.isBooked)}
                                                    className={getSeatClassName(seat)}
                                                    disabled={seat.isBooked}
                                                    title={`${seat.seatTypeName} (+${seat.surcharge.toLocaleString('vi-VN')}đ)`}
                                                >
                                                    {seat.seatNumber}
                                                </button>
                                            ))}
                                        </div>
                                        <span className="w-8 text-center text-sm font-bold text-slate-600 bg-slate-100 rounded-lg py-2">{row}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden sticky top-6">
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={showtimeDetails.movieImageUrl}
                                    alt={showtimeDetails.movieTitle}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute top-4 right-4">
                                    <span className="bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                        {showtimeDetails.movieRating}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h2 className="text-xl font-bold text-slate-800 mb-4 line-clamp-2 leading-tight">
                                    {showtimeDetails.movieTitle}
                                </h2>

                                <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <MapPin size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-slate-700 leading-relaxed">{showtimeDetails.cinemaName}</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Monitor size={18} className="text-purple-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-slate-700">{showtimeDetails.screeningRoomName}</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Calendar size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-slate-700">{showtimeDetails.showtimeDate}</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-slate-700">{showtimeDetails.showtimeTime}</span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 mb-6">
                                    <div className="flex items-start gap-3 mb-3">
                                        <Armchair size={18} className="text-slate-600 flex-shrink-0 mt-0.5" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-slate-600 mb-1 font-medium">Ghế đã chọn</p>
                                            <p className="text-sm font-bold text-slate-800 break-words">
                                                {selectedSeatNames || 'Chưa chọn ghế'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-slate-200">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-sm text-slate-600 font-medium">Tổng tiền</span>
                                            <div className="text-right">
                                                <p className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                                                    {totalPrice.toLocaleString('vi-VN')}
                                                </p>
                                                <p className="text-sm text-slate-600 font-medium">đồng</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 transform ${selectedSeats.length > 0
                                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/60 hover:-translate-y-0.5'
                                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                        }`}
                                    disabled={selectedSeats.length === 0}
                                >
                                    {selectedSeats.length > 0 ? 'ĐẶT VÉ NGAY' : 'VUI LÒNG CHỌN GHẾ'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
