import { CinemaType } from "../types/cinema"

const CinemaComponent = ({ id, name, location }: CinemaType) => {
    return (
        <>
            <div>{id} - {name} - {location}</div>
        </>
    )
}

export default CinemaComponent