import CinemaComponent from "../../components/CinemaComponent";
import useCinema from "../../hooks/useCinema";

const Cinema = () => {
    const { cinemas, isLoading, error } = useCinema();
    if (isLoading) {
        return <p>Đang tải danh sách rạp chiếu...</p>
    }

    if (error) {
        return <p>Lỗi: {error}</p>
    }

    return (
        <>
            <h1>Danh sách các rạp phim</h1>
            {cinemas.map((c) => (
                <CinemaComponent
                    key={c.id}
                    id={c.id}
                    name={c.name}
                    location={c.location}
                />

            ))}
        </>
    )
}

export default Cinema