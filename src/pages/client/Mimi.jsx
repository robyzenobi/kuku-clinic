import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, Calendar, Edit2, LogOut, Layout, Home, Egg, Box, Check, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { getProfile, updateProfile } from '../../services/profileService';

const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0 last:pb-0">
        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 mt-0.5">
            <Icon size={18} />
        </div>
        <div className="flex-1">
            <p className="text-xs text-gray-500 font-medium mb-0.5">{label}</p>
            <p className="text-sm font-bold text-gray-900">{value || <span className="text-gray-400 italic">Haijawekwa</span>}</p>
        </div>
    </div>
);

const EditField = ({ label, name, type = "text", placeholder, profile, setProfile }) => (
    <div className="mb-3">
        <label className="block text-xs font-bold text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
            value={profile[name] || ""}
            onChange={(e) => setProfile({ ...profile, [name]: e.target.value })}
            placeholder={placeholder}
        />
    </div>
);

const Mimi = () => {
    const { signOut, user: authUser } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Default profile state
    const [profile, setProfile] = useState({
        full_name: authUser?.email?.split('@')[0] || "Mkulima",
        phone: "",
        farm_name: "",
        location: "",
        farm_type: "Layers & Broilers",
        start_date: "",
        system: "Deep Litter",
        capacity: "",
        sheds_count: ""
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await getProfile();
            if (data) {
                setProfile({
                    ...data,
                    phone: data.phone || "",
                    farm_name: data.farm_name || "",
                    location: data.location || "",
                    start_date: data.start_date || "",
                    capacity: data.capacity !== null ? String(data.capacity) : "",
                    sheds_count: data.sheds_count !== null ? String(data.sheds_count) : ""
                });
            }
            setLoading(false);
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        const result = await updateProfile(profile);
        setSaving(false);
        if (result.success) {
            setIsEditing(false);
        } else {
            console.error("Save error: ", result.error);
            alert(`Imeshindwa kuhifadhi: ${result.error || "Tafadhali jaribu tena."}`);
        }
    };

    const handleLogout = () => {
        if (window.confirm("Je, una uhakika unataka kuondoka?")) {
            signOut();
        }
    };



    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50 pb-24">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-24 safe-area-pb">
            {/* Header / Identity Section */}
            <div className="bg-white px-6 pt-8 pb-8 border-b border-gray-100 shadow-sm rounded-b-[2.5rem] mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>

                <div className="relative z-10 flex flex-col items-center text-center mt-4">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg shadow-emerald-100/50">
                        <span className="text-3xl font-bold text-emerald-700">
                            {profile.full_name?.charAt(0)?.toUpperCase()}
                        </span>
                    </div>
                    {isEditing ? (
                        <input
                            type="text"
                            className="text-xl font-bold text-center text-gray-900 mb-1 w-full bg-gray-50 rounded-lg p-1"
                            value={profile.full_name}
                            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                            placeholder="Jina lako kamili"
                        />
                    ) : (
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">{profile.full_name}</h1>
                    )}

                    <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100 mt-2">
                        <Phone size={14} />
                        {isEditing ? (
                            <input
                                type="text"
                                className="text-sm font-medium bg-transparent outline-none w-28 placeholder-gray-400"
                                value={profile.phone}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                placeholder="Namba yako"
                            />
                        ) : (
                            <span className="text-sm font-medium">{profile.phone || "Ongeza Namba"}</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="px-5 space-y-6">
                {/* Wasifu wa Shamba Card */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-50">
                        <h2 className="text-lg font-bold text-gray-900">Wasifu wa Shamba</h2>
                        {isEditing ? (
                            <div className="flex gap-2">
                                <button onClick={() => setIsEditing(false)} className="p-1.5 text-gray-500 bg-gray-100 rounded-full">
                                    <X size={16} />
                                </button>
                                <button onClick={handleSave} disabled={saving} className="flex items-center gap-1 text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-full transition-colors text-xs font-bold disabled:opacity-50">
                                    <Check size={14} />
                                    {saving ? '...' : 'Hifadhi'}
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="flex items-center gap-1 text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-full transition-colors text-xs font-bold bg-emerald-50/50">
                                <Edit2 size={14} />
                                Hariri
                            </button>
                        )}
                    </div>

                    {isEditing ? (
                        <div className="animate-in fade-in slide-in-from-top-2">
                            <EditField label="Jina la Shamba" name="farm_name" placeholder="Mfano: Hamisi Poultry Farm" profile={profile} setProfile={setProfile} />
                            <EditField label="Mahali (Location)" name="location" placeholder="Mfano: Mbagala, Dar" profile={profile} setProfile={setProfile} />

                            <div className="mb-3">
                                <label className="block text-xs font-bold text-gray-700 mb-1">Aina ya Kuku</label>
                                <select
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
                                    value={profile.farm_type}
                                    onChange={(e) => setProfile({ ...profile, farm_type: e.target.value })}
                                >
                                    <option value="Layers">Layers Tupu</option>
                                    <option value="Broilers">Broilers Tupu</option>
                                    <option value="Layers & Broilers">Layers & Broilers</option>
                                    <option value="Kienyeji">Kienyeji</option>
                                </select>
                            </div>

                            <EditField label="Tarehe ya Kuanza" name="start_date" type="date" profile={profile} setProfile={setProfile} />

                            <div className="mb-3">
                                <label className="block text-xs font-bold text-gray-700 mb-1">Mfumo wa Ufugaji</label>
                                <select
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
                                    value={profile.system}
                                    onChange={(e) => setProfile({ ...profile, system: e.target.value })}
                                >
                                    <option value="Deep Litter">Deep Litter (Chini)</option>
                                    <option value="Cages">Kwenye Cages</option>
                                    <option value="Free Range">Nje (Free Range)</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <EditField label="Uwezo wa Banda" name="capacity" type="number" placeholder="Kuku wangapi" profile={profile} setProfile={setProfile} />
                                <EditField label="Idadi ya Mabanda" name="sheds_count" type="number" placeholder="Mabanda" profile={profile} setProfile={setProfile} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col animate-in fade-in">
                            <InfoItem icon={Home} label="Jina la Shamba" value={profile.farm_name} />
                            <InfoItem icon={MapPin} label="Mahali" value={profile.location} />
                            <InfoItem icon={Egg} label="Aina ya Kuku" value={profile.farm_type} />
                            <InfoItem icon={Calendar} label="Tarehe ya Kuanza" value={profile.start_date} />
                            <InfoItem icon={Layout} label="Mfumo wa Ufugaji" value={profile.system} />
                            <InfoItem icon={Box} label="Uwezo wa Banda" value={profile.capacity ? `${profile.capacity} Kuku` : ""} />
                            <InfoItem icon={Home} label="Idadi ya Mabanda" value={profile.sheds_count} />
                        </div>
                    )}
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
                    <p className="text-xs text-gray-400">Toleo 1.0.1 • Iliyounganishwa Cloud</p>
                </div>
            </div>
        </div>
    );
};

export default Mimi;
