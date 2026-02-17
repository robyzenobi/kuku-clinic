import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Box, TrendingUp, TrendingDown, Plus, Info, Egg, Syringe, Skull, ShoppingBag, DollarSign } from 'lucide-react';
import { flocks, healthLogs, feedLogs, productionLogs, financeLogs, financeStats } from '../../data/rekodiData';
import RecordActionModal from '../../components/client/RecordActionModal';

const SummaryCard = ({ title, value, subtext, icon: Icon, color, bg }) => (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-28">
        <div className="flex justify-between items-start">
            <div className={`p-2 rounded-xl ${bg} ${color}`}>
                <Icon size={20} />
            </div>
            {subtext && <span className={`text-xs font-bold px-2 py-1 rounded-full ${color.replace('text-', 'bg-').replace('500', '50')} ${color}`}>{subtext}</span>}
        </div>
        <div>
            <span className="text-xs text-gray-500 font-medium">{title}</span>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">{value}</h3>
        </div>
    </div>
);

const TabButton = ({ active, label, onClick }) => (
    <button
        onClick={onClick}
        className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${active
            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
    >
        {label}
    </button>
);

const SectionHeader = ({ title, action }) => (
    <div className="flex justify-between items-center mb-4 mt-6 px-2">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {action && (
            <button className="text-sm text-emerald-600 font-bold hover:underline">
                {action}
            </button>
        )}
    </div>
);

const Rekodi = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Makundi');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRecordAction = (actionId) => {
        alert(`Fungua fomu ya: ${actionId}`);
        // Navigate or open specific form here
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Makundi':
                return (
                    <div className="space-y-4 px-2">
                        {flocks.map(flock => (
                            <div key={flock.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                            <Box size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{flock.breed}</h4>
                                            <p className="text-xs text-gray-500">{flock.age} • Started {flock.arrivalDate}</p>
                                        </div>
                                    </div>
                                    <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full font-bold">
                                        {flock.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    <div className="bg-gray-50 p-2 rounded-xl text-center">
                                        <span className="text-xs text-gray-500 block">Initial</span>
                                        <span className="font-bold text-gray-900">{flock.initialCount}</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded-xl text-center">
                                        <span className="text-xs text-gray-500 block">Sasa</span>
                                        <span className="font-bold text-gray-900">{flock.currentCount}</span>
                                    </div>
                                    <div className="bg-red-50 p-2 rounded-xl text-center">
                                        <span className="text-xs text-red-500 block">Vifo</span>
                                        <span className="font-bold text-red-600">{flock.initialCount - flock.currentCount}</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-50 pt-3">
                                    <h5 className="text-xs font-bold text-gray-400 uppercase mb-2">Utendaji (KPIs)</h5>
                                    <div className="flex justify-between text-sm">
                                        <div className="flex flex-col">
                                            <span className="text-gray-500 text-xs">Mortality %</span>
                                            <span className="font-bold text-gray-900">{flock.mortality}%</span>
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span className="text-gray-500 text-xs">Est. FCR</span>
                                            <span className="font-bold text-gray-900">1.5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'Afya':
                return (
                    <div className="space-y-3 px-2">
                        {healthLogs.map(log => (
                            <div key={log.id} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                                <div className={`p-2 rounded-full ${log.type === 'Vaccination' ? 'bg-blue-50 text-blue-500' : 'bg-red-50 text-red-500'}`}>
                                    {log.type === 'Vaccination' ? <Syringe size={18} /> : <Skull size={18} />}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm text-gray-900">{log.detail}</h4>
                                    <p className="text-xs text-gray-500">{log.date} • {log.notes}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'Chakula':
                return (
                    <div className="space-y-3 px-2">
                        {feedLogs.map(log => (
                            <div key={log.id} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                                <div className="p-2 bg-orange-50 text-orange-500 rounded-full">
                                    <ShoppingBag size={18} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm text-gray-900">{log.item} ({log.quantity})</h4>
                                    <p className="text-xs text-gray-500">{log.date} • {log.type}</p>
                                </div>
                                {log.cost && <span className="font-bold text-gray-900 text-sm">-{log.cost}</span>}
                            </div>
                        ))}
                    </div>
                );
            case 'Uzalishaji':
                return (
                    <div className="space-y-3 px-2">
                        {productionLogs.map(log => (
                            <div key={log.id} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                                <div className="p-2 bg-yellow-50 text-yellow-600 rounded-full">
                                    <Egg size={18} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm text-gray-900">{log.quantity || log.item}</h4>
                                    <p className="text-xs text-gray-500">{log.date} • {log.type}</p>
                                </div>
                                {log.amount && <span className="font-bold text-emerald-600 text-sm">+{log.amount}</span>}
                            </div>
                        ))}
                    </div>
                );
            case 'Fedha':
                return (
                    <div className="space-y-3 px-2">
                        {financeLogs.map(log => (
                            <div key={log.id} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                                <div className={`p-2 rounded-full ${log.type === 'income' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
                                    {log.type === 'income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm text-gray-900">{log.description}</h4>
                                    <p className="text-xs text-gray-500">{log.date} • {log.category}</p>
                                </div>
                                <span className={`font-bold text-sm ${log.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {log.type === 'income' ? '+' : '-'}{log.amount.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-24 safe-area-pb">
            {/* Detailed Header */}
            <div className="bg-emerald-600 px-6 pt-8 pb-10 rounded-b-[2rem] shadow-lg mb-6">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate('/app/home')}
                        className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold text-white">Rekodi za Shamba</h1>
                </div>

                {/* Summary Cards Row */}
                <div className="grid grid-cols-3 gap-3">
                    <SummaryCard
                        title="Ndege Hai"
                        value="1,465"
                        icon={Box}
                        color="text-indigo-600"
                        bg="bg-indigo-50"
                    />
                    <SummaryCard
                        title="Mali"
                        value="12.5M"
                        icon={DollarSign}
                        color="text-emerald-600"
                        bg="bg-emerald-50"
                    />
                    <SummaryCard
                        title="Faida"
                        value="+1.2M"
                        subtext="Wiki hii"
                        icon={TrendingUp}
                        color="text-emerald-600"
                        bg="bg-emerald-50"
                    />
                </div>
            </div>

            {/* Scrollable Tabs */}
            <div className="px-5 mb-4 overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 min-w-max">
                    {['Makundi', 'Afya', 'Chakula', 'Uzalishaji', 'Fedha'].map(tab => (
                        <TabButton
                            key={tab}
                            active={activeTab === tab}
                            label={tab}
                            onClick={() => setActiveTab(tab)}
                        />
                    ))}
                </div>
            </div>

            {/* Dynamic Content */}
            <div className="px-4 animate-fade-in">
                <SectionHeader
                    title={activeTab}
                    action={activeTab !== 'Makundi' ? 'Onyesha Zote' : null}
                />
                {renderContent()}
            </div>
        </div>
    );
};

export default Rekodi;
