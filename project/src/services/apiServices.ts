import { CinemaType } from '../types/cinema';
import { CinemaShowtime } from '../types/cinema-showtime';
import { Genre } from '../types/genre';
import { Movie } from '../types/movie';

// Lấy URL gốc của API từ file .env (ví dụ: VITE_API_BASE_URL=http://localhost:5000)
// import.meta.env là cách Vite truy cập biến môi trường
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Hàm bất đồng bộ (async) dùng để gọi API lấy danh sách phim
// Trả về một Promise chứa mảng Movie[]
export const getMovies = async (): Promise<Movie[]> => {

    // Gọi API GET đến endpoint /api/movies
    const response = await fetch(`${API_BASE_URL}/api/movies`);

    // Kiểm tra nếu server trả lỗi (status code không nằm trong khoảng 200–299)
    // thì ném ra lỗi để nơi gọi hàm có thể xử lý (try...catch)
    if (!response.ok) {
        throw new Error('Không thể tải danh sách phim.');
    }

    // Nếu thành công, parse dữ liệu JSON từ response
    // và trả về kết quả là mảng các đối tượng Movie
    return response.json();
};

export const getMovieById = async (id: number): Promise<Movie> => {
    const response = await fetch(`${API_BASE_URL}/api/movies/${id}`);
    if (!response.ok) {
        throw new Error('Không thể tải thông tin chi tiết phim.');
    }

    return response.json();
};

export const getMovieByGenre = async (id: number): Promise<Movie[]> => {
    const response = await fetch(`${API_BASE_URL}/api/movies/genre/${id}`);
    if (!response.ok) {
        throw new Error('Không thể tải thông tin phim.');
    }

    return response.json();
};

export const getShowtimeByMovie = async (movieId: number): Promise<CinemaShowtime[]> => {
    const response = await fetch(`${API_BASE_URL}/api/showtime/movie/${movieId}`);
    if (!response.ok) {
        throw new Error('Không thể tải dữ liệu lịch chiếu.');
    }

    return response.json();
}

export const getAvailableDatesByMovieId = async (movieId: number): Promise<string[]> => {
    const response = await fetch(`${API_BASE_URL}/api/showtimes/movie/${movieId}/dates`);
    if (!response.ok) {
        throw new Error('Không thể tải danh sách ngày chiếu.');
    }

    return response.json();
};

export const getTestGenres = async (): Promise<Genre[]> => {
    const response = await fetch(`${API_BASE_URL}/api/genre`);
    if (!response.ok) {
        throw new Error('Không thể tải danh sách thể loại.');
    }

    return response.json();
}

export const getCinema = async (): Promise<CinemaType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/cinema`);
    if (!response.ok) {
        throw new Error('Không thể tải danh sách rạp chiếu.');
    }

    return response.json();
}

export const searchMovies = async (query: string): Promise<Movie[]> => {
    const encodQuery = encodeURIComponent(query);
    const response = await fetch(`${API_BASE_URL}/api/movies/search?query=${encodQuery}`);
    if (!response.ok) {
        throw new Error('Không thể tải kết quả tìm kiếm.')
    }

    return response.json();
}