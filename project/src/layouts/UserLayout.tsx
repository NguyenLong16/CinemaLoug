// src/layouts/UserLayout.tsx
import { Outlet } from 'react-router-dom';
import Header from '../components/Header'; // Import Header chung
import Footer from '../components/Footer';

export default function UserLayout() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                {/* Outlet là nơi các trang con (HomePage, MovieDetail) sẽ được hiển thị */}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}