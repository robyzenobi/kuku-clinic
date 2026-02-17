import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, ShoppingBag, ClipboardList, BookOpen, ArrowRight, Clock } from 'lucide-react';
import { getDashboardStats } from '../../services/dashboardService';
import { allArticles } from '../../data/articles';

const DashboardCard = ({ title, icon: Icon, color, bg, onClick }) => (
    <div onClick={onClick} className="flex flex-col items-center justify-center bg-white p-4 rounded-3xl shadow-sm border border-gray-100 active:scale-95 transition-transform cursor-pointer h-32 w-full hover:shadow-md">
        <div className={`p-3 rounded-full mb-2 ${bg} ${color}`}>
            <Icon size={28} />
        </div>
        <span className="text-sm font-semibold text-gray-700">{title}</span>
    </div>
);

const MkulimaDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = React.useState({ kuku: 0, mauzo: 0, miadi: 0 });
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="p-4 pb-24 mx-auto w-full max-w-7xl">
            {/* Top Header / Stats Bar */}
            <header className="mb-6 bg-primary text-white p-6 rounded-[2rem] shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold mb-1">Habari, Mkulima</h1>
                    <p className="text-emerald-100 text-sm mb-4">Kuku Clinic Dashboard</p>

                    <div className="flex justify-between bg-white/20 p-4 rounded-2xl backdrop-blur-sm max-w-3xl mx-auto">
                        <div className="text-center flex-1">
                            <span className="block text-2xl font-bold">{loading ? '-' : stats.kuku}</span>
                            <span className="text-xs text-emerald-50 uppercase tracking-wider">Kuku</span>
                        </div>
                        <div className="h-auto w-px bg-white/30 mx-2"></div>
                        <div className="text-center flex-1">
                            <span className="block text-2xl font-bold">{loading ? '-' : stats.mauzo}</span>
                            <span className="text-xs text-emerald-50 uppercase tracking-wider">Mauzo</span>
                        </div>
                        <div className="h-auto w-px bg-white/30 mx-2"></div>
                        <div className="text-center flex-1">
                            <span className="block text-2xl font-bold">{loading ? '-' : stats.miadi}</span>
                            <span className="text-xs text-emerald-50 uppercase tracking-wider">Miadi</span>
                        </div>
                    </div>
                </div>

                {/* Decorative Circle */}
                <div className="absolute -right-6 -top-6 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            </header>

            {/* Feature Grid */}
            <h2 className="text-xl font-bold text-gray-800 mb-6 px-2">Huduma</h2>

            {/* Clean 2x2 Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto mb-8">
                <DashboardCard
                    title="Daktari"
                    icon={Stethoscope}
                    color="text-blue-500"
                    bg="bg-blue-50"
                    onClick={() => navigate('/app/daktari')}
                />
                <DashboardCard
                    title="Soko"
                    icon={ShoppingBag}
                    color="text-orange-500"
                    bg="bg-orange-50"
                />
                <DashboardCard
                    title="Rekodi"
                    icon={ClipboardList}
                    color="text-purple-500"
                    bg="bg-purple-50"
                    onClick={() => navigate('/app/records')}
                />
                <DashboardCard
                    title="Jifunze"
                    icon={BookOpen}
                    color="text-indigo-500"
                    bg="bg-indigo-50"
                    onClick={() => navigate('/app/learn')}
                />
            </div>

            {/* Makala za Karibuni */}
            <div className="px-2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Makala za Karibuni</h2>
                    <button
                        onClick={() => navigate('/app/learn')}
                        className="text-sm text-emerald-600 font-bold flex items-center gap-1"
                    >
                        Soma zaidi <ArrowRight size={16} />
                    </button>
                </div>

                <div className="space-y-3">
                    {allArticles.slice(0, 2).map((article) => (
                        <div
                            key={article.id}
                            onClick={() => navigate('/app/learn')}
                            className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
                        >
                            <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0">
                                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{article.title}</h4>
                                <div className="flex items-center text-gray-400 text-xs">
                                    <Clock size={12} className="mr-1" />
                                    {article.readTime}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MkulimaDashboard;
