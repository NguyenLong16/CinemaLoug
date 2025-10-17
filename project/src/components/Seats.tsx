import { Film, MapPin, Calendar, Clock, Monitor, Armchair } from 'lucide-react';
import { useState } from 'react';

// Seat status types
type SeatStatus = 'available' | 'selected' | 'booked' | 'vip';

interface Seat {
    id: string;
    status: SeatStatus;
    row: string;
    number: number;
}

function Seats() {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const generateSeats = (): Seat[] => {
        const seats: Seat[] = [];
        const rows = ['J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
        const bookedSeats = ['J5', 'J6', 'I7', 'I8', 'H4', 'G10', 'G11', 'F3', 'E5', 'D8'];

        rows.forEach(row => {
            const seatsPerRow = row === 'A' ? 17 : 18;
            for (let i = 1; i <= seatsPerRow; i++) {
                const seatId = `${row}${i}`;
                let status: SeatStatus = 'available';

                if (bookedSeats.includes(seatId)) {
                    status = 'booked';
                }

                seats.push({
                    id: seatId,
                    status,
                    row,
                    number: i
                });
            }
        });

        return seats;
    };

    const seats = generateSeats();

    const toggleSeat = (seatId: string, currentStatus: SeatStatus) => {
        if (currentStatus === 'booked') return;

        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(id => id !== seatId)
                : [...prev, seatId]
        );
    };

    const getSeatClassName = (seat: Seat) => {
        const isSelected = selectedSeats.includes(seat.id);

        const baseClasses = "w-10 h-10 rounded-full text-xs font-semibold flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110";

        if (seat.status === 'booked') {
            return `${baseClasses} bg-red-400 text-white cursor-not-allowed hover:scale-100`;
        }

        if (isSelected) {
            return `${baseClasses} bg-yellow-400 text-gray-800 shadow-lg`;
        }

        return `${baseClasses} bg-gray-300 text-gray-700 hover:bg-gray-400`;
    };

    const totalPrice = selectedSeats.length * 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="text-sm text-blue-600">
                    <a href="#" className="hover:underline">Trang chủ</a>
                    <span className="mx-2">›</span>
                    <a href="#" className="hover:underline">Đặt vé</a>
                    <span className="mx-2">›</span>
                    <span className="text-gray-700">Từ Chiến Trên Không</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left side - Seat selection */}
                    <div className="lg:col-span-2">
                        {/* Age restriction notice */}
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
                            <p className="text-sm text-yellow-800">
                                Theo quy định của cục điện ảnh, phim này không dành cho khán giả dưới 16 tuổi.
                            </p>
                        </div>

                        {/* Seat status legend */}
                        <div className="flex flex-wrap gap-6 mb-6 bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                <span className="text-sm text-gray-700">Ghế trống</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-gray-700">Ghế đang chọn</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-sky-400 rounded-full"></div>
                                <span className="text-sm text-gray-700">Ghế đang được giữ</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                                <span className="text-sm text-gray-700">Ghế đã bán</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                                <span className="text-sm text-gray-700">Ghế đặt trước</span>
                            </div>
                        </div>

                        {/* Screen */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="mb-8">
                                <div className="relative">
                                    <div className="h-16 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-full"></div>
                                    <div className="text-center py-2 text-gray-500 text-sm font-medium">
                                        MÀN HÌNH CHIẾU
                                    </div>
                                </div>
                            </div>

                            {/* Seats */}
                            <div className="space-y-3 flex flex-col items-center">
                                {['J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'].map(row => (
                                    <div key={row} className="flex items-center gap-2">
                                        <span className="w-6 text-sm font-semibold text-gray-600">{row}</span>
                                        <div className="flex gap-1">
                                            {seats
                                                .filter(seat => seat.row === row)
                                                .map(seat => (
                                                    <button
                                                        key={seat.id}
                                                        onClick={() => toggleSeat(seat.id, seat.status)}
                                                        className={getSeatClassName(seat)}
                                                        disabled={seat.status === 'booked'}
                                                    >
                                                        {seat.number}
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary section */}
                        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="flex justify-center mb-2">
                                        <Armchair className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <div className="text-sm text-gray-600 mb-1">Ghế thường</div>
                                </div>
                                <div>
                                    <div className="flex justify-center mb-2">
                                        <Armchair className="w-12 h-12 text-gray-700" />
                                    </div>
                                    <div className="text-sm text-gray-600 mb-1">Ghế VIP</div>
                                </div>
                                <div>
                                    <div className="flex justify-center mb-2">
                                        <Armchair className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <div className="text-sm text-gray-600 mb-1">Ghế đôi</div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Tổng tiền</div>
                                    <div className="text-3xl font-bold text-gray-800">{totalPrice} vnđ</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Thời gian còn lại</div>
                                    <div className="text-3xl font-bold text-gray-800">8:28</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Movie info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-4">
                            {/* Movie poster */}
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop"
                                    alt="Từ Chiến Trên Không"
                                    className="w-full h-80 object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-yellow-400 text-gray-800 px-3 py-1 rounded font-bold">
                                    T16
                                </div>
                            </div>

                            {/* Movie details */}
                            <div className="p-6 space-y-4">
                                <h2 className="text-2xl font-bold text-blue-600">Từ Chiến Trên Không</h2>
                                <div className="text-lg text-gray-700">2D Phụ đề</div>

                                <div className="space-y-3 pt-4 border-t border-gray-200">
                                    <div className="flex items-start gap-3">
                                        <Film className="w-5 h-5 text-gray-500 mt-0.5" />
                                        <div className="flex-1">
                                            <div className="text-sm text-gray-600">Thể loại</div>
                                            <div className="font-semibold text-gray-800">Hành động</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                                        <div className="flex-1">
                                            <div className="text-sm text-gray-600">Thời lượng</div>
                                            <div className="font-semibold text-gray-800">118 phút</div>
                                        </div>
                                    </div>

                                    <div className="h-px bg-gray-200 my-4"></div>

                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                                        <div className="flex-1">
                                            <div className="text-sm text-gray-600">Rạp chiếu</div>
                                            <div className="font-semibold text-gray-800">Beta Thái Nguyên</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                                        <div className="flex-1">
                                            <div className="text-sm text-gray-600">Ngày chiếu</div>
                                            <div className="font-semibold text-gray-800">12/10/2025</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                                        <div className="flex-1">
                                            <div className="text-sm text-gray-600">Giờ chiếu</div>
                                            <div className="font-semibold text-gray-800">11:40</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Monitor className="w-5 h-5 text-gray-500 mt-0.5" />
                                        <div className="flex-1">
                                            <div className="text-sm text-gray-600">Phòng chiếu</div>
                                            <div className="font-semibold text-gray-800">P1</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Armchair className="w-5 h-5 text-gray-500 mt-0.5" />
                                        <div className="flex-1">
                                            <div className="text-sm text-gray-600">Ghế ngồi</div>
                                            <div className="font-semibold text-gray-800">
                                                {selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 mt-6 flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    TIẾP TỤC
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Seats;
