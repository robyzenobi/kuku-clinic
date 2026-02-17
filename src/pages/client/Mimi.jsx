import React from 'react';
import { User, Phone, MapPin, Calendar, Edit2, LogOut, Layout, Home, Egg, Box } from 'lucide-react';

const Mimi = () => {
    // Mock User Data
    const user = {
        name: "Juma Hamisi",
        phone: "+255 712 345 678",
        farm: {
            name: "Hamisi Poultry Farm",
            location: "Mbagala, Dar es Salaam",
            type: "Layers & Broilers",
            startDate: "Jan 2024",
            system: "Deep Litter",
            capacity: "2,000 Kuku",
            sheds: "3 Mabanda"
        }
    };

    const handleLogout = () => {
        if (window.confirm("Je, una uhakika unataka kuondoka?")) {
            console.log("Logging out...");
            // Add logout logic here later
        }
    };

    const InfoItem = ({ icon: Icon, label, value }) => (
        <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0 last:pb-0">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 mt-0.5">
                <Icon size={18} />
            </div>
            <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium mb-0.5">{label}</p>
                <p className="text-sm font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen pb-24 safe-area-pb">
            {/* Header / Identity Section */}
            <div className="bg-white px-6 pt-8 pb-8 border-b border-gray-100 shadow-sm rounded-b-[2.5rem] mb-6 relative overflow-hidden">
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg shadow-emerald-100/50">
                        <span className="text-3xl font-bold text-emerald-700">JH</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
                    <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
                        <Phone size={14} />
                        <span className="text-sm font-medium">{user.phone}</span>
                    </div>
                </div>
            </div>

            <div className="px-5 space-y-6">
                {/* Wasifu wa Shamba Card */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-50">
                        <h2 className="text-lg font-bold text-gray-900">Wasifu wa Shamba</h2>
                        <button className="flex items-center gap-1 text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-full transition-colors text-xs font-bold bg-emerald-50/50">
                            <Edit2 size={14} />
                            Hariri
                        </button>
                    </div>

                    <div className="flex flex-col">
                        <InfoItem icon={Home} label="Jina la Shamba" value={user.farm.name} />
                        <InfoItem icon={MapPin} label="Mahali" value={user.farm.location} />
                        <InfoItem icon={Egg} label="Aina ya Kuku" value={user.farm.type} />
                        <InfoItem icon={Calendar} label="Tarehe ya Kuanza" value={user.farm.startDate} />
                        <InfoItem icon={Layout} label="Mfumo wa Ufugaji" value={user.farm.system} />
                        <InfoItem icon={Box} label="Uwezo wa Banda" value={user.farm.capacity} />
                        <InfoItem icon={Home} label="Idadi ya Mabanda" value={user.farm.sheds} />
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border border-red-100 text-red-500 font-bold bg-white hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                >
                    <LogOut size={20} />
                    Ondoka
                </button>

                <div className="text-center pb-4">
                    <p className="text-xs text-gray-400">Toleo 1.0.0</p>
                </div>
            </div>
        </div>
    );
};

export default Mimi;
