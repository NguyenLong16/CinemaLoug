import TestComponent from "../../components/TestComponent";
import useTestGenre from "../../hooks/useTestGenre"

const TestGenre = () => {
    //Sử dụng custom hook để lấy dữ liệu trả ra từ api
    const { genre, isLoading, error } = useTestGenre();

    if (isLoading) {
        return <p>Đang tải danh sách thể loại...</p>
    }

    if (error) {
        return <p>Lỗi: {error}</p>
    }

    return (
        <>
            <h1>Danh sách thể loại</h1>
            {genre.map((g) => (
                <TestComponent
                    key={g.id}
                    id={g.id}
                    name={g.name}
                />
            ))}
        </>
    )
}

export default TestGenre