import { useState, useRef, useEffect } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { CinemaType } from '../types/cinema';

interface DropDownCinemaProps {
    cinemas: CinemaType[];
}

export default function DropDownCinema({ cinemas }: DropDownCinemaProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCinema, setSelectedCinema] = useState<CinemaType | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cinemas && cinemas.length > 0 && !selectedCinema) {
            setSelectedCinema(cinemas[0]);
        }
    }, [cinemas, selectedCinema]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCinemaSelect = (cinema: CinemaType) => {
        setSelectedCinema(cinema);
        setIsOpen(false);
    };

    if (!selectedCinema) {
        return null;
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium min-w-[240px] group"
            >
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1 text-left truncate">
                    {selectedCinema.name}
                </span>
                <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full left-0 mt-2 w-full min-w-[300px] max-w-md bg-white rounded-xl shadow-2xl border border-gray-100 z-20 overflow-hidden animate-slideDown">
                        <div className="p-3 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
                            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-orange-500" />
                                Chọn rạp chiếu phim
                            </h3>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            {cinemas.map((cinema) => (
                                <button
                                    key={cinema.id}
                                    onClick={() => handleCinemaSelect(cinema)}
                                    className={`w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors duration-150 border-b border-gray-50 last:border-b-0 group ${selectedCinema?.id === cinema.id ? 'bg-orange-50' : ''
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 transition-colors duration-200 ${selectedCinema?.id === cinema.id
                                                ? 'bg-orange-500'
                                                : 'bg-gray-300 group-hover:bg-orange-300'
                                                }`}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={`font-semibold transition-colors duration-150 ${selectedCinema?.id === cinema.id
                                                    ? 'text-orange-600'
                                                    : 'text-gray-800 group-hover:text-orange-600'
                                                    }`}
                                            >
                                                {cinema.name}
                                            </p>
                                            {cinema.location && (
                                                <p className="text-sm text-gray-500 mt-0.5 truncate">
                                                    {cinema.location}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {cinemas.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p className="text-sm">Không có rạp nào</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
