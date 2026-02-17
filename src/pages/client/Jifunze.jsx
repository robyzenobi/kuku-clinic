import React, { useState } from 'react';
import { Search, Thermometer, Droplets, Egg, Pill, Clock, Play, Bell, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ... (omitting lines 5-151 to avoid huge context, assuming tool handles start/end lines correctly if I just target the header area? No, replace_file_content needs contiguous block. I will target the top of the file for imports and then the header block separately if possible? No, "Do NOT make multiple parallel calls to this tool... for the same file". I must use multi_replace_file_content or just one large replace if contiguous.)

// Actually, I can use multi_replace_file_content.


const topics = [
    {
        id: 'disease',
        icon: Thermometer,
        title: "Magonjwa ya Kuku",
        description: "Jifunze kuhusu magonjwa na tiba",
        count: "12",
        color: "text-red-500",
        bg: "bg-red-50",
        activeBorder: "border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50"
    },
    {
        id: 'nutrition',
        icon: Droplets,
        title: "Lishe na Maji",
        description: "Chakula bora kwa kuku wako",
        count: "8",
        color: "text-blue-500",
        bg: "bg-blue-50",
        activeBorder: "border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50"
    },
    {
        id: 'production',
        icon: Egg,
        title: "Uzalishaji wa Mayai",
        description: "Mbinu za kuongeza mayai",
        count: "15",
        color: "text-orange-500",
        bg: "bg-orange-50",
        activeBorder: "border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50"
    },
    {
        id: 'vaccination',
        icon: Pill,
        title: "Chanjo na Tiba",
        description: "Ratiba za chanjo muhimu",
        count: "6",
        color: "text-emerald-500",
        bg: "bg-emerald-50",
        activeBorder: "border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50"
    }
];

import { allArticles } from '../../data/articles';

const TopicCard = ({ icon: Icon, title, description, count, color, bg, onClick, isActive }) => (
    <div
        onClick={onClick}
        className={`bg-white p-4 rounded-2xl shadow-sm border ${isActive ? 'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50/30' : 'border-gray-100'} flex flex-col items-start hover:shadow-md transition-all cursor-pointer`}
    >
        <div className={`p-3 rounded-full mb-3 ${bg} ${color}`}>
            <Icon size={24} />
        </div>
        <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{description}</p>
        <span className={`text-xs font-semibold ${color}`}>{count} makala</span>
    </div>
);

const ArticleCard = ({ image, category, title, readTime }) => (
    <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 mb-3 hover:bg-gray-50 transition-colors cursor-pointer animate-fade-in">
        <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0">
            <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
            <span className="text-xs font-bold text-emerald-600 mb-1 block">{category}</span>
            <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{title}</h4>
            <div className="flex items-center text-gray-400 text-xs">
                <Clock size={12} className="mr-1" />
                {readTime}
            </div>
        </div>
        <div className="text-gray-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
    </div>
);

const VideoCard = ({ thumbnail, title, duration }) => (
    <div className="min-w-[280px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow mr-4">
        <div className="relative h-40 bg-gray-900">
            <img src={thumbnail} alt={title} className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/30 backdrop-blur-sm p-3 rounded-full">
                    <Play size={24} fill="white" className="text-white" />
                </div>
            </div>
            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-medium">
                {duration}
            </span>
        </div>
        <div className="p-3">
            <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{title}</h4>
        </div>
    </div>
);

const Jifunze = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('Zote');

    const handleCategoryClick = (categoryTitle) => {
        // Toggle: if clicking the active category, go back to 'Zote'
        if (activeCategory === categoryTitle) {
            setActiveCategory('Zote');
        } else {
            setActiveCategory(categoryTitle);
        }
    };

    const filteredArticles = activeCategory === 'Zote'
        ? allArticles
        : allArticles.filter(article => article.category === activeCategory);

    return (
        <div className="bg-gray-50 pb-6 safe-area-pb">
            {/* Header */}
            <div className="bg-white px-6 pt-6 pb-4 sticky top-0 z-40 border-b border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <ArrowLeft size={24} className="text-gray-700" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">Jifunze</h1>
                    </div>
                    <div className="relative">
                        <Bell size={24} className="text-gray-600" />
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tafuta maarifa..."
                        className="w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                    />
                </div>
            </div>

            <div className="p-6">
                {/* Mada (Topics) Section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Mada</h2>
                        {activeCategory !== 'Zote' && (
                            <button
                                onClick={() => setActiveCategory('Zote')}
                                className="text-sm text-emerald-600 font-medium"
                            >
                                Onyesha Zote
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {topics.map((topic) => (
                            <TopicCard
                                key={topic.id}
                                icon={topic.icon}
                                title={topic.title}
                                description={topic.description}
                                count={topic.count}
                                color={topic.color}
                                bg={topic.bg}
                                onClick={() => handleCategoryClick(topic.title)}
                                isActive={activeCategory === topic.title}
                            />
                        ))}
                    </div>
                </div>

                {/* Makala (Popular Articles) Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                        {activeCategory === 'Zote' ? 'Makala Maarufu' : `Makala: ${activeCategory}`}
                    </h2>
                    <div className="flex flex-col min-h-[200px] transition-all duration-300">
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map((article) => (
                                <ArticleCard
                                    key={article.id}
                                    image={article.image}
                                    category={article.category}
                                    title={article.title}
                                    readTime={article.readTime}
                                />
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <p>Hakuna makala katika kundi hili kwa sasa.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Video za Mafunzo Section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Video za Mafunzo</h2>
                        <button className="text-emerald-600 text-sm font-bold">Zote</button>
                    </div>

                    <div className="flex overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                        <VideoCard
                            thumbnail="https://images.unsplash.com/photo-1563404555554-754876b66d40?auto=format&fit=crop&q=80&w=400&h=250"
                            title="Jinsi ya Kuanzisha Ufugaji"
                            duration="15:32"
                        />
                        <VideoCard
                            thumbnail="https://images.unsplash.com/photo-1612170153139-6f881d97f1f8?auto=format&fit=crop&q=80&w=400&h=250"
                            title="Kusafisha Banda la Kuku"
                            duration="08:45"
                        />
                    </div>
                </div>

                {/* Ask an Expert Banner */}
                <div className="bg-emerald-600 rounded-3xl p-6 text-white text-center shadow-lg shadow-emerald-200 mt-4">
                    <h3 className="text-xl font-bold mb-2">Uliza Mtaalamu</h3>
                    <p className="text-emerald-100 text-sm mb-6 max-w-xs mx-auto">
                        Una swali kuhusu ufugaji? Wasiliana na madaktari wetu waliobobea kwa ushauri wa haraka.
                    </p>
                    <button
                        onClick={() => navigate('/app/daktari')}
                        className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-transform hover:bg-emerald-50"
                    >
                        Wasiliana na Daktari
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Jifunze;
