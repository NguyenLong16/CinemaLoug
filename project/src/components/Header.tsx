import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import useCinemas from '../hooks/useCinema';
import SearchSuggestions from './SearchSuggestions';
import DropDownCinema from './DropDownCinema';

export default function Header() {
  // === STATE: Quản lý trạng thái nội bộ của component ===
  const [query, setQuery] = useState('');
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

  // === HOOKS: Sử dụng các "công cụ" của React và custom hook ===
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 500);
  const { cinemas, isLoading, error } = useCinemas();

  // Ref: Tạo một "tham chiếu" đến thẻ div bao quanh khu vực tìm kiếm
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // === HANDLERS: Các hàm xử lý sự kiện của người dùng ===

  // Xử lý khi nhấn Enter hoặc nút tìm kiếm
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuggestionsVisible(false);
    if (query.trim()) {
      navigate(`/?query=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/');
    }
  };

  // === EFFECTS: Xử lý các "side effect" ===

  // Effect này để lắng nghe sự kiện click ra bên ngoài khu vực tìm kiếm
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Nếu khu vực tìm kiếm tồn tại và nơi người dùng click không nằm trong khu vực đó
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSuggestionsVisible(false); // Thì ẩn danh sách gợi ý
      }
    }
    // Gắn listener vào toàn bộ trang
    document.addEventListener("mousedown", handleClickOutside);
    // Dọn dẹp listener khi component bị gỡ bỏ để tránh rò rỉ bộ nhớ
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]); // Chỉ chạy lại khi ref thay đổi (thường là 1 lần)

  // Effect này để hiển thị gợi ý khi người dùng đang gõ
  useEffect(() => {
    if (debouncedQuery.trim()) {
      setIsSuggestionsVisible(true);
    } else {
      setIsSuggestionsVisible(false);
    }
  }, [debouncedQuery]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-4 text-sm">
          <Link to="/login" className="hover:text-gray-300 transition-colors">Đăng nhập</Link>
          <span className="text-gray-600">|</span>
          <Link to="/register" className="hover:text-gray-300 transition-colors">Đăng Ký</Link>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">L</span>
                </div>
                <div className="flex flex-col leading-tight ml-2">
                  <span className="text-2xl font-bold text-gray-900">Loug</span>
                  <span className="text-xs text-gray-500 -mt-1">cinemas</span>
                </div>
              </Link>

              {/* Khu vực tìm kiếm được bọc bởi div có ref */}

              {isLoading && <div className="text-sm text-gray-500">Tải rạp...</div>}
              {error && <div className="text-sm text-red-500">Lỗi</div>}
              {cinemas && cinemas.length > 0 && <DropDownCinema cinemas={cinemas} />}
            </div>

            <div className="flex items-center gap-8">
              <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
                <Link to="/all-movies" className="text-gray-700 hover:text-orange-500">PHIM</Link>
                <Link to="/cinema" className="text-gray-700 hover:text-orange-500">RẠP</Link>
                <Link to="/member" className="text-gray-700 hover:text-orange-500">THÀNH VIÊN</Link>
              </nav>
              <div className="relative" ref={searchContainerRef}>
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.trim() && setIsSuggestionsVisible(true)}
                    placeholder="Tìm phim, thể loại..."
                    className="w-72 pl-4 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                    autoComplete="off"
                  />
                  <button type="submit" className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
                    <Search className="w-5 h-5" />
                  </button>
                </form>
                {isSuggestionsVisible && (
                  <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-50">
                    <SearchSuggestions
                      query={debouncedQuery}
                      onClose={() => setIsSuggestionsVisible(false)}
                    />
                  </div>
                )}

              </div>

            </div>
          </div>
        </div>
      </header>
    </>
  );
}