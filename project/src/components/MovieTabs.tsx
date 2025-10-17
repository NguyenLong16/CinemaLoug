import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from './MovieCard';
import { useMovies } from '../hooks/useMovies';
import useSearchMovies from '../hooks/useSearchMovies';

// Định nghĩa kiểu dữ liệu cho các tab
type TabType = 'nowShowing' | 'comingSoon' | 'special';

// ==================================================================
// Component con: Chỉ để hiển thị KẾT QUẢ TÌM KIẾM
// ==================================================================
function SearchResults({ query }: { query: string }) {
  const { movies, isLoading, error } = useSearchMovies(query);

  if (isLoading) return <p className="col-span-4 text-center text-xl text-gray-500">Đang tìm kiếm...</p>;
  if (error) return <p className="col-span-4 text-center text-xl text-red-600">Lỗi: {error}</p>;

  return (
    <>
      <h2 className="col-span-4 text-3xl font-bold mb-4 text-center">
        Kết quả tìm kiếm cho: <span className="text-blue-600">"{query}"</span>
      </h2>
      {movies.length > 0 ? (
        movies.map(movie => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            genres={movie.genres}
            duration={movie.duration}
            rating={movie.rating}
            imageUrl={movie.imageUrl}
            showBuyButton={movie.statusName?.trim().toLowerCase() !== 'sắp chiếu'}
          />
        ))
      ) : (
        <p className="col-span-4 text-center text-gray-500">Không tìm thấy phim nào khớp với từ khóa của bạn.</p>
      )}
    </>
  );
}

// ==================================================================
// Component con: Chỉ để hiển thị CÁC TAB PHIM
// ==================================================================
function TabbedMovies() {
  // SỬA LẠI ĐÚNG Ở DÒNG NÀY: Thêm <TabType> để TypeScript hiểu rõ activeTab
  const [activeTab, setActiveTab] = useState<TabType>('nowShowing');
  const { movies: allMovies, isLoading, error } = useMovies();

  const categorizedMovies = useMemo(() => {
    if (!allMovies) return { nowShowing: [], comingSoon: [], special: [] };
    const comingSoon = allMovies.filter(m => m.statusName?.trim().toLowerCase() === 'sắp chiếu');
    const nowShowing = allMovies.filter(m => m.statusName?.trim().toLowerCase() === 'đang chiếu');
    const special = allMovies.filter(m => m.statusName?.trim().toLowerCase() === 'suất chiếu đặc biệt');
    return { nowShowing, comingSoon, special };
  }, [allMovies]);

  const tabs = [
    { id: 'comingSoon' as TabType, label: 'PHIM SẮP CHIẾU' },
    { id: 'nowShowing' as TabType, label: 'PHIM ĐANG CHIẾU' },
    { id: 'special' as TabType, label: 'SUẤT CHIẾU ĐẶC BIỆT' }
  ];

  if (isLoading) return <p className="col-span-4 text-center text-xl text-gray-500">Đang tải...</p>;
  if (error) return <p className="col-span-4 text-center text-xl text-red-600">Lỗi: {error}</p>;

  return (
    <>
      <div className="col-span-4 flex justify-center gap-8 mb-12 border-b-2 border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative pb-4 px-6 font-bold text-lg transition-all duration-300 ${activeTab === tab.id
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-blue-500'
              }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>
      {categorizedMovies[activeTab].length === 0 ? (
        <p className="col-span-4 text-center text-gray-500">Không có phim nào trong mục này.</p>
      ) : (
        categorizedMovies[activeTab].map(movie => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            genres={movie.genres}
            duration={movie.duration}
            rating={movie.rating}
            imageUrl={movie.imageUrl}
            showBuyButton={activeTab !== 'comingSoon'}
          />
        ))
      )}
    </>
  );
}

export default function MovieTabs() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Nếu có `query` trên URL, hiển thị kết quả tìm kiếm. Nếu không, hiển thị các tab phim. */}
          {query ? <SearchResults query={query} /> : <TabbedMovies />}
        </div>
      </div>
    </section>
  );
}