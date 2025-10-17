import { TestTypeGenre } from "../types/test"

const TestComponent = ({ id, name }: TestTypeGenre) => {


    return (
        <>
            <div>
                <p>{id} - {name}</p>
            </div>
        </>
    )
}

export default TestComponent    