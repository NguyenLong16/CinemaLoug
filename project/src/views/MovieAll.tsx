import MovieAllComponent from "../components/MovieAllComponent"
import { useMovies } from "../hooks/useMovies";

const MovieAll = () => {
    const { movies, isLoading, error } = useMovies()
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center"></h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {movies.map((m) => (
                        <MovieAllComponent
                            key={m.id}
                            id={m.id}
                            title={m.title}
                            genres={m.genres}
                            duration={m.duration}
                            rating={m.rating}
                            imageUrl={m.imageUrl}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MovieAll