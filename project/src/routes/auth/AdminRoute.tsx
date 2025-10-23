import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

const AdminRoute = () => {
    const { isAdmin, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Nếu chưa đăng nhập, chuyển về trang login
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        // Nếu đã đăng nhập nhưng không phải admin, chuyển về trang chủ
        return <Navigate to="/" replace />;
    }

    // Nếu là admin, cho phép truy cập component con
    return <Outlet />;
};

export default AdminRoute;