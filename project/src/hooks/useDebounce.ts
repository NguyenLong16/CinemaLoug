import { useState, useEffect } from 'react';

// Hook này nhận một giá trị và một khoảng thời gian chờ (delay)
export function useDebounce<T>(value: T, delay: number): T {
    // State để lưu trữ giá trị đã được "debounce"
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Thiết lập một bộ đếm thời gian (timer)
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Dọn dẹp timer mỗi khi value hoặc delay thay đổi
        // Điều này ngăn không cho giá trị cũ được cập nhật
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Chỉ chạy lại effect nếu value hoặc delay thay đổi

    return debouncedValue;
}