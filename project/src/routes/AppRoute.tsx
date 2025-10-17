import { Route, Routes } from "react-router-dom"
import HomePage from "../components/HomePage"
import Login from "../components/Login"
import Register from "../components/Register"
import Seats from "../components/Seats"
import MovieDetail from "../components/MovieDetail"
import SearchGenre from "../components/SearchGenre"
import TestGenre from "../views/TestGenre"
import Cinema from "../views/Cinema"
import MovieAll from "../views/MovieAll"

function AppRoute() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/test" element={<TestGenre />}></Route>
                <Route path="/seats" element={<Seats />}></Route>
                <Route path="/movie-detail/:id" element={<MovieDetail />}></Route>
                <Route path="/genre/:genreId" element={<SearchGenre />}></Route>
                <Route path="/cinema" element={<Cinema />}></Route>
                <Route path="/all-movies" element={<MovieAll />}></Route>
            </Routes>
        </>

    )
}

export default AppRoute