import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import ShowtimesModal from './ShowTimesModal'; // Import component modal mới
import { MovieCardProps } from '../types/movieCardProps';


function MovieCard({ id, title, genres, duration, rating, imageUrl, showBuyButton }: MovieCardProps) {
  // MovieCard chỉ cần quản lý trạng thái đóng/mở
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Link to={`/movie-detail/${id}`}>
        <div className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
          <div className="relative aspect-[2/3] overflow-hidden">
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-md font-bold text-sm z-10">{rating}</div>
            <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100" />
          </div>
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">{title}</h3>
            <div className="space-y-1 text-sm text-gray-600 mb-4">
              <p>
                <span className="font-semibold">Thể loại: </span>
                {genres.map((genre, index) => (
                  <span key={genre.id}>
                    <Link
                      to={`/genre/${genre.id}`}
                      className="text-blue-600 hover:underline"
                      onClick={(e) => e.stopPropagation()} // Ngăn không cho link cha bị kích hoạt
                    >
                      {genre.name}
                    </Link>
                    {/* Thêm dấu phẩy nếu không phải là thể loại cuối cùng */}
                    {index < genres.length - 1 && ', '}
                  </span>
                ))}
              </p>
              <p className="flex items-center gap-1"><Clock className="w-4 h-4" /> <span className="font-semibold">Thời lượng:</span> {duration}</p>
            </div>
            <div className='w-full mt-auto'>
              {showBuyButton ? (
                <button onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg">MUA VÉ</button>
              ) : (
                <div className='w-full bg-gray-400 text-white font-bold py-3 rounded-lg text-center cursor-not-allowed'>SẮP CHIẾU</div>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Gọi component modal và truyền props */}
      <ShowtimesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movieId={id}
        movieInfo={{ title, genres, duration }}
      />
    </>
  );
}

export default MovieCard