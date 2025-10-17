import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Tee Yod: Quỷ Ăn Tạng Phần 3',
    subtitle: 'Lửa hận thù đốt cháy ký ức nhà ta...',
    date: 'Từ 18H-8.10.2025 và cả ngày 9.10.2025',
    premiere: 'Chính thức khởi chiếu 10.10.2025',
    image: 'https://images.pexels.com/photos/4722571/pexels-photo-4722571.jpeg?auto=compress&cs=tinysrgb&w=1920',
    rating: 'T16'
  },
  {
    id: 2,
    title: 'Từ Chiến Trên Không',
    subtitle: 'Sức chiến đấu từ bầu trời Việt Nam',
    date: 'Suất chiếu đặc biệt',
    premiere: 'Khởi chiếu 19.05.2025',
    image: 'https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&w=1920',
    rating: 'T16'
  },
  {
    id: 3,
    title: 'Chị Ngã Em Nâng',
    subtitle: 'Hài hước gia đình đầy bất ngờ',
    date: 'Suất chiếu sớm',
    premiere: 'Khởi chiếu 03.10.2025',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920',
    rating: 'T13'
  },
  {
    id: 4,
    title: 'Chú Thuật Hồi Chiến',
    subtitle: 'Hoài Ngọc và Ngọc Chiến trong cuộc chiến ma thuật',
    date: 'Anime bom tấn',
    premiere: 'Khởi chiếu 10.10.2025',
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1920',
    rating: 'T13'
  },
  {
    id: 5,
    title: 'Hành Trình Phiêu Lưu',
    subtitle: 'Cuộc phiêu lưu đầy kịch tính',
    date: 'Đang chiếu',
    premiere: 'Đang chiếu tại rạp',
    image: 'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=1920',
    rating: 'T16'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-[600px] bg-black overflow-hidden group">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10" />

          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-2xl">
                <div className="inline-block bg-red-600 text-white px-3 py-1 rounded mb-4 font-bold text-sm">
                  {slide.rating}
                </div>

                <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>

                <p className="text-xl text-gray-200 mb-2 italic">
                  {slide.subtitle}
                </p>

                <div className="space-y-2 mb-6">
                  <p className="text-white font-semibold text-lg">
                    {slide.date}
                  </p>
                  <p className="text-red-400 font-bold text-xl">
                    {slide.premiere}
                  </p>
                </div>

                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  MUA VÉ NGAY
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-12 h-12 rounded-full border-2 border-white transition-all duration-300 ${
              index === currentSlide
                ? 'bg-orange-500 scale-110'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
