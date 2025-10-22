import { Film, MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">L</span>
                            </div>
                            <div className="flex flex-col leading-tight ml-3">
                                <span className="text-2xl font-bold">Loug</span>
                                <span className="text-xs text-gray-400 -mt-1">cinemas</span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Hệ thống rạp chiếu phim hiện đại, mang đến trải nghiệm điện ảnh tuyệt vời nhất cho khán giả Việt Nam.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Film className="w-5 h-5 text-orange-500" />
                            Phim & Rạp
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/all-movies" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    Phim Đang Chiếu
                                </Link>
                            </li>
                            <li>
                                <Link to="/all-movies" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    Phim Sắp Chiếu
                                </Link>
                            </li>
                            <li>
                                <Link to="/cinema" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    Hệ Thống Rạp
                                </Link>
                            </li>
                            <li>
                                <Link to="/member" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    Thành Viên
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-orange-500" />
                            Liên Hệ
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2 text-gray-400">
                                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                                <span>Số 123, Đường ABC, Quận 1, TP.HCM</span>
                            </li>
                            <li className="flex items-center gap-2 text-gray-400">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                <span>1900 xxxx</span>
                            </li>
                            <li className="flex items-center gap-2 text-gray-400">
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                <span>support@lougcinemas.vn</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Kết Nối Với Chúng Tôi</h3>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                                aria-label="Youtube"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <p>© 2024 Loug Cinemas. Tất cả quyền được bảo lưu.</p>
                        <div className="flex gap-6">
                            <Link to="#" className="hover:text-orange-500 transition-colors">
                                Điều Khoản Sử Dụng
                            </Link>
                            <Link to="#" className="hover:text-orange-500 transition-colors">
                                Chính Sách Bảo Mật
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
