import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Smartphone, ChevronDown, Check, LogOut, User, Settings, Home, Stethoscope, ShoppingBag, PlusCircle, FileText } from 'lucide-react';

const UnifiedShell = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Determine current mode based on URL
    const isDashboard = location.pathname.includes('/dashboard');
    const isClient = location.pathname.includes('/app');

    const handleModeSwitch = (mode) => {
        if (mode === 'dashboard') {
            navigate('/dashboard/overview');
        } else {
            navigate('/app/home');
        }
    };

    const handleDropdownNavigate = (path) => {
        setIsDropdownOpen(false);
        navigate(path);
    };

    // Dropdown Items Config
    const dropdownItems = [
        { label: 'Home', path: '/app/home', icon: Home },
        { label: 'Vets', path: '/app/daktari', icon: Stethoscope },
        { label: 'Marketplace', path: '/app/market', icon: ShoppingBag },
        { label: 'Profile', path: '/app/profile', icon: User },
        { label: 'My Flocks', path: '/dashboard/flocks', icon: FileText }, // Direct link to dashboard data for now
        { label: 'Add New', path: '/app/add', icon: PlusCircle }, // Placeholder
        { label: 'Request Consultation', path: '/app/consultation', icon: Stethoscope },
    ];

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
            {/* Global Top Bar */}
            <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50 shadow-sm shrink-0">
                {/* Left: Mode Toggle */}
                <div className="flex items-center gap-2">
                    <div className="flex bg-gray-100/80 p-1 rounded-lg">
                        <button
                            onClick={() => handleModeSwitch('dashboard')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${isDashboard ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            <LayoutDashboard size={14} />
                            Dashboard
                        </button>
                        <button
                            onClick={() => handleModeSwitch('client')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${!isDashboard ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            <Smartphone size={14} />
                            Preview
                        </button>
                    </div>
                </div>

                {/* Center/Right: Dropdown Navigation (Only visible in Preview mode or if desired globally) */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                    >
                        <span>Home</span>
                        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                            <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <div className="p-2 space-y-0.5">
                                    {dropdownItems.map((item) => (
                                        <button
                                            key={item.label}
                                            onClick={() => handleDropdownNavigate(item.path)}
                                            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors text-left"
                                        >
                                            <item.icon size={16} className="text-gray-400 group-hover:text-emerald-500" />
                                            {item.label}
                                        </button>
                                    ))}
                                    <div className="my-1 border-t border-gray-100"></div>
                                    <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left">
                                        <LogOut size={16} />
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </header>

            {/* Main Application Area */}
            <div className="flex-1 overflow-hidden relative">
                <Outlet />
            </div>
        </div>
    );
};

export default UnifiedShell;
