import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Box, TrendingUp, TrendingDown, Plus, Info, Egg, Syringe, Skull, ShoppingBag, DollarSign } from 'lucide-react';
import { getFlocks } from '../../services/flockService';
import { getHealthLogs } from '../../services/healthService';
import { getFeedLogs } from '../../services/feedService';
import { getProductionLogs } from '../../services/productionService';
import { getFinanceLogs } from '../../services/financeService';

import AddFlockModal from '../../components/client/AddFlockModal';
import AddHealthModal from '../../components/client/AddHealthModal';
import AddFeedModal from '../../components/client/AddFeedModal';
import AddProductionModal from '../../components/client/AddProductionModal';
import AddFinanceModal from '../../components/client/AddFinanceModal';

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

    // Dynamic State
    const [flocksData, setFlocksData] = useState([]);
    const [healthData, setHealthData] = useState([]);
    const [feedData, setFeedData] = useState([]);
    const [productionData, setProductionData] = useState([]);
    const [financeData, setFinanceData] = useState([]);

    // Loading State
    const [loadingFlocks, setLoadingFlocks] = useState(true);
    const [loadingHealth, setLoadingHealth] = useState(true);
    const [loadingFeed, setLoadingFeed] = useState(true);
    const [loadingProduction, setLoadingProduction] = useState(true);
    const [loadingFinance, setLoadingFinance] = useState(true);

    // Modal States
    const [isFlockModalOpen, setFlockModalOpen] = useState(false);
    const [isHealthModalOpen, setHealthModalOpen] = useState(false);
    const [isFeedModalOpen, setFeedModalOpen] = useState(false);
    const [isProductionModalOpen, setProductionModalOpen] = useState(false);
    const [isFinanceModalOpen, setFinanceModalOpen] = useState(false);

    useEffect(() => {
        const fetchAllDatalogs = async () => {
            const [flocks, health, feed, production, finance] = await Promise.all([
                getFlocks(),
                getHealthLogs(),
                getFeedLogs(),
                getProductionLogs(),
                getFinanceLogs()
            ]);

            setFlocksData(flocks);
            setLoadingFlocks(false);

            setHealthData(health);
            setLoadingHealth(false);

            setFeedData(feed);
            setLoadingFeed(false);

            setProductionData(production);
            setLoadingProduction(false);

            setFinanceData(finance);
            setLoadingFinance(false);
        };
        fetchAllDatalogs();
    }, []);

    const calculateCurrentTotalBirds = () => {
        return flocksData.reduce((sum, flock) => sum + (flock.current_count || 0), 0);
    };

    const handleAddClick = () => {
        switch (activeTab) {
            case 'Makundi': setFlockModalOpen(true); break;
            case 'Afya': setHealthModalOpen(true); break;
            case 'Chakula': setFeedModalOpen(true); break;
            case 'Uzalishaji': setProductionModalOpen(true); break;
            case 'Fedha': setFinanceModalOpen(true); break;
            default: break;
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Makundi':
                if (loadingFlocks) {
                    return (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                        </div>
                    );
                }

                if (flocksData.length === 0) {
                    return (
                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                            <div className="bg-emerald-50 p-4 rounded-full mb-4 text-emerald-600">
                                <Box size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Huna Kundi Lolote</h3>
                            <p className="text-gray-500 text-sm mb-6 max-w-xs">
                                Anza kwa kuongeza kundi lako la kwanza la kuku ili uweze kutunza kumbukumbu zao kwa ufasaha.
                            </p>
                        </div>
                    );
                }

                return (
                    <div className="space-y-4 px-2">
                        {flocksData.map(flock => (
                            <div key={flock.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                            <Box size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{flock.name || flock.type}</h4>
                                            <p className="text-xs text-gray-500">{flock.age_weeks} Weeks • {flock.type}</p>
                                        </div>
                                    </div>
                                    <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full font-bold">
                                        {flock.status || "Active"}
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    <div className="bg-gray-50 p-2 rounded-xl text-center">
                                        <span className="text-xs text-gray-500 block">Initial</span>
                                        <span className="font-bold text-gray-900">{flock.initial_count}</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded-xl text-center">
                                        <span className="text-xs text-gray-500 block">Sasa</span>
                                        <span className="font-bold text-gray-900">{flock.current_count}</span>
                                    </div>
                                    <div className="bg-red-50 p-2 rounded-xl text-center">
                                        <span className="text-xs text-red-500 block">Vifo</span>
                                        <span className="font-bold text-red-600">{flock.initial_count - flock.current_count}</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-50 pt-3">
                                    <h5 className="text-xs font-bold text-gray-400 uppercase mb-2">Taarifa (KPIs)</h5>
                                    <div className="flex justify-between text-sm">
                                        <div className="flex flex-col">
                                            <span className="text-gray-500 text-xs">Vifo %</span>
                                            <span className="font-bold text-gray-900">
                                                {flock.initial_count > 0
                                                    ? Math.round(((flock.initial_count - flock.current_count) / flock.initial_count) * 100)
                                                    : 0}%
                                            </span>
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span className="text-gray-500 text-xs">Aina</span>
                                            <span className="font-bold text-gray-900">{flock.type}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'Afya':
                if (loadingHealth) {
                    return (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                        </div>
                    );
                }

                if (healthData.length === 0) {
                    return (
                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                            <div className="bg-blue-50 p-4 rounded-full mb-4 text-blue-500">
                                <Syringe size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Hakuna Rekodi za Afya</h3>
                            <p className="text-gray-500 text-sm mb-6 max-w-xs">
                                Hujaongeza rekodi zozote za magonjwa, vifo, au chanjo.
                            </p>
                        </div>
                    );
                }

                return (
                    <div className="space-y-3 px-2">
                        {healthData.map(log => (
                            <div key={log.id} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                                <div className={`p-2 rounded-full ${log.type === 'Vaccination' ? 'bg-blue-50 text-blue-500' : 'bg-red-50 text-red-500'}`}>
                                    {log.type === 'Vaccination' ? <Syringe size={18} /> : <Skull size={18} />}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm text-gray-900">{log.diagnosis || log.type}</h4>
                                    <p className="text-xs text-gray-500">
                                        {new Date(log.date).toLocaleDateString()} • {log.treatment || log.notes || 'Hakuna maelezo'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'Chakula':
                if (loadingFeed) {
                    return (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                        </div>
                    );
                }

                if (feedData.length === 0) {
                    return (
                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                            <div className="bg-amber-50 p-4 rounded-full mb-4 text-amber-600">
                                <Box size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Hakuna Rekodi za Chakula</h3>
                            <p className="text-gray-500 text-sm mb-6 max-w-xs">
                                Hujaongeza rekodi zozote za chakula kwa sasa.
                            </p>
                        </div>
                    );
                }

                return (
                    <div className="space-y-3 px-2">
                        {feedData.map(log => (
                            <div key={log.id} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                                <div className="p-2 bg-orange-50 text-orange-500 rounded-full">
                                    <ShoppingBag size={18} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm text-gray-900">{log.feed_type}</h4>
                                    <p className="text-xs text-gray-500">{new Date(log.date).toLocaleDateString()} • {log.notes || 'Hakuna maelezo'}</p>
                                </div>
                                <span className="font-bold text-gray-900 text-sm">{log.quantity_kg} kg</span>
                            </div>
                        ))}
                    </div>
                );
            case 'Uzalishaji':
                if (loadingProduction) {
                    return (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                        </div>
                    );
                }

                if (productionData.length === 0) {
                    return (
                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                            <div className="bg-orange-50 p-4 rounded-full mb-4 text-orange-500">
                                <Egg size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Hakuna Rekodi za Uzalishaji</h3>
                            <p className="text-gray-500 text-sm mb-6 max-w-xs">
                                Haujaweka rekodi zozote za mayai mpaka sasa.
                            </p>
                        </div>
                    );
                }

                return (
                    <div className="space-y-3 px-2">
                        {productionData.map(log => {
                            const totalEggs = Number(log.good_eggs) + Number(log.bad_eggs);
                            const trays = Math.floor(totalEggs / 30);
                            const remainingEggs = totalEggs % 30;

                            return (
                                <div key={log.id} className="bg-white p-4 rounded-xl border border-gray-100">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <Egg size={16} />
                                            <span>{new Date(log.date).toLocaleDateString()}</span>
                                        </div>
                                        <span className="text-xs font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">
                                            {trays} Trei{remainingEggs > 0 ? ` + ${remainingEggs}` : ''}
                                        </span>
                                    </div>
                                    <div className="flex gap-4">
                                        <div>
                                            <span className="text-xs text-gray-500 block">Mazima</span>
                                            <span className="font-bold text-emerald-600">{log.good_eggs}</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500 block">Mabovu</span>
                                            <span className="font-bold text-red-500">{log.bad_eggs}</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500 block">Jumla</span>
                                            <span className="font-bold text-gray-900">{totalEggs}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            case 'Fedha':
                if (loadingFinance) {
                    return (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                        </div>
                    );
                }

                const stats = financeData.reduce((acc, curr) => {
                    const amount = Number(curr.amount) || 0;
                    if (curr.type === 'income') acc.income += amount;
                    if (curr.type === 'expense') acc.expenses += amount;
                    return acc;
                }, { income: 0, expenses: 0 });
                const netProfit = stats.income - stats.expenses;

                return (
                    <div className="space-y-6 px-2">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
                                        <TrendingUp size={16} />
                                    </div>
                                    <span className="text-xs text-emerald-700 font-bold">Mapato</span>
                                </div>
                                <h4 className="text-2xl font-black text-emerald-700">
                                    <span className="text-sm">TZS</span> {stats.income.toLocaleString()}
                                </h4>
                            </div>

                            <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-1.5 bg-red-100 text-red-600 rounded-lg">
                                        <TrendingDown size={16} />
                                    </div>
                                    <span className="text-xs text-red-700 font-bold">Matumizi</span>
                                </div>
                                <h4 className="text-2xl font-black text-red-700">
                                    <span className="text-sm">TZS</span> {stats.expenses.toLocaleString()}
                                </h4>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                            <h4 className="text-sm text-gray-500 font-medium mb-1">Faida Kuu / Hasara</h4>
                            <h2 className={`text-3xl font-black tracking-tight ${netProfit >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                                <span className="text-xl text-gray-400">TZS</span> {netProfit.toLocaleString()}
                            </h2>
                        </div>

                        <div>
                            <SectionHeader title="Miamala ya Hivi Karibuni" action="Tazama Yote" />
                            {financeData.length === 0 ? (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
                                    Hakuna miamala yoyote.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {financeData.map(log => (
                                        <div key={log.id} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${log.type === 'income' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
                                                {log.type === 'income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-sm text-gray-900">{log.description || log.category}</h4>
                                                <p className="text-xs text-gray-500">{new Date(log.date).toLocaleDateString()} • {log.category}</p>
                                            </div>
                                            <span className={`font-bold text-sm ${log.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                                                {log.type === 'income' ? '+' : '-'}{Number(log.amount).toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
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
                        value={loadingFlocks ? "..." : calculateCurrentTotalBirds().toLocaleString()}
                        icon={Box}
                        color="text-indigo-600"
                        bg="bg-indigo-50"
                    />
                    <SummaryCard
                        title="Mali"
                        value={loadingFinance ? "..." : (financeData.reduce((acc, curr) => acc + (curr.type === 'income' ? Number(curr.amount) : -Number(curr.amount)), 0)).toLocaleString()}
                        icon={DollarSign}
                        color="text-emerald-600"
                        bg="bg-emerald-50"
                    />
                    <SummaryCard
                        title="Faida"
                        value={loadingFinance ? "..." : (financeData.reduce((acc, curr) => acc + (curr.type === 'income' ? Number(curr.amount) : -Number(curr.amount)), 0)).toLocaleString()}
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
            <div className="px-4 animate-fade-in relative z-10">
                <SectionHeader
                    title={activeTab}
                    action={activeTab !== 'Makundi' ? 'Onyesha Zote' : null}
                />
                {renderContent()}
            </div>

            {/* Floating Action Button */}
            <button
                onClick={handleAddClick}
                className="fixed bottom-24 right-6 p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg shadow-emerald-200 transition-colors z-40"
            >
                <Plus size={24} />
            </button>

            {/* Modals */}
            <AddFlockModal
                isOpen={isFlockModalOpen}
                onClose={() => setFlockModalOpen(false)}
                onAdd={(newFlock) => setFlocksData([newFlock, ...flocksData])}
            />
            <AddHealthModal
                isOpen={isHealthModalOpen}
                onClose={() => setHealthModalOpen(false)}
                onAdd={(newLog) => setHealthData([newLog, ...healthData])}
            />
            <AddFeedModal
                isOpen={isFeedModalOpen}
                onClose={() => setFeedModalOpen(false)}
                onAdd={(newLog) => setFeedData([newLog, ...feedData])}
            />
            <AddProductionModal
                isOpen={isProductionModalOpen}
                onClose={() => setProductionModalOpen(false)}
                onAdd={(newLog) => setProductionData([newLog, ...productionData])}
            />
            <AddFinanceModal
                isOpen={isFinanceModalOpen}
                onClose={() => setFinanceModalOpen(false)}
                onAdd={(newLog) => setFinanceData([newLog, ...financeData])}
            />
        </div>
    );
};

export default Rekodi;
