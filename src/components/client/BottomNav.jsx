import React from 'react';
import { Home, Search, Stethoscope, User, Plus, MessageCircle } from 'lucide-react';

const BottomNav = ({ activeTab, onTabChange, onFabClick }) => {
    const getTabClass = (tabName) =>
        `flex flex-col items-center justify-center w-12 cursor-pointer transition-colors space-y-1 ${activeTab === tabName ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-600'}`;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] px-6 py-2 flex justify-between items-center z-50 h-20 safe-area-pb">

            {/* Nyumbani */}
            <div className={getTabClass('home')} onClick={() => onTabChange('home')}>
                <Home size={24} />
                <span className="text-[10px] font-medium mt-1">Nyumbani</span>
            </div>

            {/* Chat (Replaces Search) */}
            <div className={`${getTabClass('chat')} mr-8`} onClick={() => onTabChange('chat')}>
                <MessageCircle size={24} />
                <span className="text-[10px] font-medium mt-1">Chat</span>
            </div>

            {/* FAB - Central Button */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                <button
                    onClick={onFabClick}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-4 shadow-xl shadow-emerald-200 border-4 border-gray-50 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                >
                    <Plus size={32} strokeWidth={3} />
                </button>
            </div>

            {/* Daktari */}
            <div className={`${getTabClass('daktari')} ml-8`} onClick={() => onTabChange('daktari')}>
                <Stethoscope size={24} />
                <span className="text-[10px] font-medium mt-1">Daktari</span>
            </div>

            {/* Mimi */}
            <div className={getTabClass('profile')} onClick={() => onTabChange('profile')}>
                <User size={24} />
                <span className="text-[10px] font-medium mt-1">Mimi</span>
            </div>

        </div>
    );
};

export default BottomNav;
