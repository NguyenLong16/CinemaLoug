// src/layouts/AdminLayout.tsx
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Để lấy thông tin user và hàm logout

export default function AdminLayout() {
    const { user, logout } = useAuth();

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar Admin */}
            <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
                <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
                <nav className="flex flex-col gap-2 mb-auto">
                    <Link to="/admin/dashboard" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
                    {/* Thêm các link quản lý khác */}
                </nav>
                <div className="mt-auto">
                    <p>Logged in as: {user?.username}</p>
                    <button onClick={logout} className="w-full mt-2 bg-red-600 hover:bg-red-700 p-2 rounded">Đăng xuất</button>
                </div>
            </aside>

            {/* Khu vực nội dung chính của Admin */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet /> {/* Các trang admin con sẽ hiển thị ở đây */}
            </main>
        </div>
    );
}