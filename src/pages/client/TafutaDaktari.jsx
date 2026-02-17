import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Phone, Check, Star, Calendar } from 'lucide-react';

const categories = ['Wote', 'Magonjwa ya Kuku', 'Wataalamu wa Chanjo', 'Lishe'];

const initialVets = [
    {
        id: 1,
        name: "Dr. Juma Hamisi",
        specialty: "Magonjwa ya Kuku",
        rating: 4.8,
        reviews: 124,
        verified: true,
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200",
        distance: "1.2 km"
    },
    {
        id: 2,
        name: "Dr. Sarah Mushi",
        specialty: "Magonjwa ya Kuku",
        rating: 4.9,
        reviews: 89,
        verified: true,
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200",
        distance: "3.5 km"
    },
    {
        id: 3,
        name: "Dr. Peter John",
        specialty: "Wataalamu wa Chanjo",
        rating: 4.5,
        reviews: 56,
        verified: true,
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200",
        distance: "0.8 km"
    },
    {
        id: 4,
        name: "Dr. Amina Ali",
        specialty: "Magonjwa ya Kuku",
        rating: 4.7,
        reviews: 210,
        verified: true,
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200",
        distance: "5.0 km"
    },
    {
        id: 5,
        name: "Dr. Kelvin Msangi",
        specialty: "Lishe",
        rating: 4.6,
        reviews: 45,
        verified: false,
        image: "https://images.unsplash.com/photo-1537368910025-bc005fe40802?auto=format&fit=crop&q=80&w=200&h=200",
        distance: "2.1 km"
    }
];

const TafutaDaktari = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('Wote');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredVets = initialVets.filter(vet => {
        const matchesCategory = activeCategory === 'Wote' || vet.specialty === activeCategory;

        const matchesSearch = vet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vet.specialty.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-gray-50 min-h-screen pb-6 safe-area-pb">
            {/* Header */}
            <div className="bg-white px-6 pt-6 pb-4 sticky top-0 z-40 border-b border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft size={24} className="text-gray-700" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Daktari</h1>
                </div>

                {/* Smart Search */}
                <div className="relative flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Jina au utaalamu..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                        />
                    </div>
                    <button className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors">
                        <MapPin size={20} />
                    </button>
                </div>
            </div>

            {/* Category Chips */}
            <div className="px-6 py-4 overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 min-w-max">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Vet Result Cards */}
            <div className="px-6 space-y-4">
                {filteredVets.length > 0 ? (
                    filteredVets.map((vet) => (
                        <div key={vet.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 animate-fade-in">
                            <div className="flex items-start gap-4">
                                <div className="relative">
                                    <img
                                        src={vet.image}
                                        alt={vet.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                                    />
                                    {vet.verified && (
                                        <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full border-2 border-white">
                                            <Check size={10} strokeWidth={3} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-900 line-clamp-1">{vet.name}</h3>
                                            <p className="text-sm text-emerald-600 font-medium mb-1">{vet.specialty}</p>
                                        </div>
                                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                                            <Star size={12} className="text-amber-500 fill-amber-500" />
                                            <span className="text-xs font-bold text-amber-700">{vet.rating}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                        <span>{vet.reviews} reviews</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1 text-gray-500">
                                            <MapPin size={10} /> {vet.distance}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2 border-t border-gray-50">
                                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-100 text-emerald-700 font-bold text-sm hover:bg-emerald-50 transition-colors">
                                    <Phone size={16} />
                                    Piga Simu
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-sm shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all">
                                    <Calendar size={16} />
                                    Weka Miadi
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Search size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Hatujapata Daktari</h3>
                        <p className="text-gray-500 max-w-xs mx-auto text-sm">
                            Hatujapata daktari kwa vigezo ulivyochagua. Jaribu kubadilisha eneo au tafuta daktari mwingine.
                        </p>
                        <button
                            onClick={() => { setActiveCategory('Wote'); setSearchQuery(''); }}
                            className="mt-6 text-emerald-600 font-bold text-sm hover:underline"
                        >
                            Onyesha Madaktari Wote
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TafutaDaktari;
