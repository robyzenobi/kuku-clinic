import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Database, Link, Shield, Code, Bot, Zap, FileText, Settings, CreditCard, ChevronDown, ChevronRight, File } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path, active, onClick, beta, indent = false }) => (
    <div
        onClick={onClick}
        className={`flex items-center px-4 py-2 my-1 mx-2 rounded-lg cursor-pointer transition-colors group ${active ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'} ${indent ? 'pl-11' : ''}`}
    >
        {Icon && <Icon size={18} className="mr-3" />}
        <span className="text-sm font-medium flex-1">{label}</span>
        {beta && <span className="bg-gray-700 text-xs px-1.5 py-0.5 rounded text-gray-300">Beta</span>}
    </div>
);

const DashboardLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDataOpen, setIsDataOpen] = useState(true);

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { label: 'Overview', icon: LayoutDashboard, path: '/dashboard/overview' },
        { label: 'Users', icon: Users, path: '/dashboard/users' },
    ];

    const dataItems = [
        { label: 'Flock', path: '/dashboard/flocks' },
        { label: 'HealthRecord', path: '/dashboard/health-records' },
        { label: 'Consultation', path: '/dashboard/consultations' },
        { label: 'SuccessStory', path: '/dashboard/success-stories' },
    ];

    return (
        <div className="flex h-screen bg-white overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full hidden md:flex">
                <div className="p-6">
                    <div className="flex items-center gap-2 font-bold text-xl text-gray-900">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
                            K
                        </div>
                        Kuku Clinic
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                    <nav className="pb-4">
                        {navItems.map((item) => (
                            <SidebarItem
                                key={item.path}
                                icon={item.icon}
                                label={item.label}
                                active={isActive(item.path)}
                                onClick={() => navigate(item.path)}
                            />
                        ))}

                        {/* Data Section (Collapsible) */}
                        <div className="mt-2">
                            <div
                                className="px-4 py-2 mx-2 flex items-center justify-between text-gray-400 hover:text-gray-800 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                onClick={() => setIsDataOpen(!isDataOpen)}
                            >
                                <span className="text-sm font-medium flex items-center gap-3">
                                    <Database size={18} /> Data
                                </span>
                                {isDataOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            </div>

                            {isDataOpen && (
                                <div className="mt-1 space-y-1">
                                    {dataItems.map((item) => (
                                        <SidebarItem
                                            key={item.path}
                                            label={item.label}
                                            path={item.path}
                                            active={isActive(item.path)}
                                            onClick={() => navigate(item.path)}
                                            indent
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Integrations & Settings */}
                        <div className="pt-2">
                            <h3 className="px-6 mb-2 mt-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Integrations</h3>
                            <SidebarItem icon={Link} label="Domains" path="/dashboard/domains" onClick={() => navigate('/dashboard/domains')} active={isActive('/dashboard/domains')} />
                            <SidebarItem icon={Shield} label="Security" path="/dashboard/security" onClick={() => navigate('/dashboard/security')} active={isActive('/dashboard/security')} />
                            <SidebarItem icon={Code} label="Code" path="/dashboard/code" onClick={() => navigate('/dashboard/code')} active={isActive('/dashboard/code')} />
                            <SidebarItem icon={Code} label="API" path="/dashboard/api" onClick={() => navigate('/dashboard/api')} active={isActive('/dashboard/api')} />
                            <SidebarItem icon={FileText} label="Logs" path="/dashboard/logs" onClick={() => navigate('/dashboard/logs')} active={isActive('/dashboard/logs')} />
                        </div>

                        <div className="mt-4 border-t border-gray-100 pt-4">
                            <SidebarItem icon={Settings} label="Settings" path="/dashboard/settings" onClick={() => navigate('/dashboard/settings')} active={isActive('/dashboard/settings')} />
                            <SidebarItem icon={Settings} label="App Settings" path="/dashboard/app-settings" onClick={() => navigate('/dashboard/app-settings')} active={isActive('/dashboard/app-settings')} />
                            <SidebarItem icon={CreditCard} label="App Template" path="/dashboard/template" onClick={() => navigate('/dashboard/template')} active={isActive('/dashboard/template')} />
                        </div>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-gray-50 flex flex-col">
                <div className="p-8 flex-1">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
