import React, { useState } from 'react';
import { Search, Filter, UserX } from 'lucide-react';

const DaktariSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="min-h-screen bg-gray-50 pb-24 w-full max-w-7xl mx-auto">
            {/* Header */}
            <header className="bg-primary text-white p-6 pb-12 rounded-b-[2rem] shadow-lg">
                <h1 className="text-2xl font-bold">Madaktari wa Mifugo</h1>
                <p className="text-emerald-100 text-sm">Tafuta mtaalamu wa mifugo karibu nawe</p>
            </header>

            {/* Search & Filter Section */}
            <div className="px-6 -mt-6">
                <div className="bg-white rounded-2xl shadow-sm p-2 flex items-center border border-gray-100 mb-4">
                    <Search className="text-gray-400 ml-2" size={20} />
                    <input
                        type="text"
                        placeholder="Tafuta daktari..."
                        className="w-full p-2 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Filter Chips */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    <button className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border border-emerald-200">
                        Wanapatikana sasa
                    </button>
                    <button className="bg-white text-gray-600 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border border-gray-200 flex items-center gap-1">
                        <Filter size={14} />
                        Vichujio
                    </button>
                </div>
            </div>

            {/* Main Content - Empty State */}
            <div className="flex flex-col items-center justify-center pt-12 px-6 text-center">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <UserX size={48} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Hakuna madaktari</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                    Hakuna madaktari yanayopatikana kwa sasa. Tafadhali jaribu tena baadaye au tumia huduma ya dharura.
                </p>
            </div>
        </div>
    );
};

export default DaktariSearch;
