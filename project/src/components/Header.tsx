import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, LogOut, UserPlus, LogIn } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import useCinemas from '../hooks/useCinema';
import SearchSuggestions from './SearchSuggestions';
import DropDownCinema from './DropDownCinema';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [query, setQuery] = useState('');
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

  const { user, logout, isAuthenticated } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 500);
  const { cinemas, isLoading, error } = useCinemas();

  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuggestionsVisible(false);
    if (query.trim()) {
      navigate(`/?query=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSuggestionsVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

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
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-3 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-4 text-sm">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <User className="w-4 h-4 text-blue-300" />
                <span className="font-medium">Chào, {user?.fullName || user?.username}!</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500/90 hover:bg-red-600 px-4 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <LogOut className="w-4 h-4" />
                Đăng xuất
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="flex items-center gap-2 bg-blue-500/90 hover:bg-blue-600 px-5 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <LogIn className="w-4 h-4" />
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 bg-emerald-500/90 hover:bg-emerald-600 px-5 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <UserPlus className="w-4 h-4" />
                Đăng ký
              </Link>
            </div>
          )}
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
