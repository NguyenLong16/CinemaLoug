import { Route, Routes } from "react-router-dom";

// Layouts
import UserLayout from "../layouts/UserLayout"; // Import layout user
import AdminLayout from "../layouts/AdminLayout"; // Import layout admin

// User Pages
import HomePage from "../components/HomePage";
import Login from "../components/Login";
import Register from "../components/Register";
import Seats from "../components/Seats";
import MovieDetail from "../components/MovieDetail";
import SearchGenre from "../components/SearchGenre";

// Admin Pages
import AdminDashboard from "../views/admin/AdminDashboard";

// Auth Guards
import AdminRoute from "./auth/AdminRoute";
import Cinema from "../views/Client/Cinema";
import MovieAll from "../views/Client/MovieAll";
import TestGenre from "../views/Client/TestGenre";

function AppRoute() {
    return (
        <Routes>
            {/* 1. Các Route dùng UserLayout */}
            <Route element={<UserLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/seats" element={<Seats />} />
                <Route path="/movie-detail/:id" element={<MovieDetail />} />
                <Route path="/genre/:genreId" element={<SearchGenre />} />
                <Route path="/cinema" element={<Cinema />} />
                <Route path="/all-movies" element={<MovieAll />} />
                {<Route path="/test" element={<TestGenre />} />}
                {/* Thêm các trang user khác vào đây */}
            </Route>

            {/* 2. Các Route không dùng layout nào (Đăng nhập/Đăng ký) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 3. Các Route Admin (Dùng AdminLayout và được bảo vệ) */}
            <Route element={<AdminRoute />}> {/* Lớp bảo vệ bên ngoài */}
                <Route element={<AdminLayout />}> {/* Layout admin bên trong */}
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    {/* Thêm các route admin khác vào đây */}
                </Route>
            </Route>

            {/* 4. Route cho trang 404 (nên đặt cuối cùng) */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
    );
}

export default AppRoute;