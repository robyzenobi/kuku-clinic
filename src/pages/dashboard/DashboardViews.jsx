import React, { useState, useEffect } from 'react';
import { getFlocks } from '../../services/flockService';
import { getConsultations } from '../../services/consultationService';

export const Overview = () => {
    const [stats, setStats] = useState({
        flocks: 0,
        users: 892,
        consultations: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch dynamic flock count and consultations
                const [flocksData, consultationsData] = await Promise.all([
                    getFlocks(),
                    getConsultations()
                ]);

                setStats(prev => ({
                    ...prev,
                    flocks: flocksData.length,
                    consultations: consultationsData.length
                }));
            } catch (err) {
                console.error("Error fetching overview stats:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-1">Total Flocks</h3>
                    <p className="text-3xl font-bold text-gray-900">
                        {loading ? "..." : stats.flocks}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-1">Active Users</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.users}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-1">Consultations</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.consultations}</p>
                </div>
            </div>
        </div>
    );
};

export const Users = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
            User management table will appear here.
        </div>
    </div>
);

export const Flocks = () => {
    const [flocksData, setFlocksData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFlocks = async () => {
            const data = await getFlocks();
            setFlocksData(data);
            setLoading(false);
        };
        fetchFlocks();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Flock Data</h2>
            {loading ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
                    Inapakia kumbukumbu za makundi...
                </div>
            ) : flocksData.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
                    Hakuna makundi yoyote yaliyosajiliwa.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {flocksData.map(flock => (
                        <div key={flock.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg mb-1">{flock.name || flock.type}</h3>
                            <div className="text-sm text-gray-600 mb-2">Age: {flock.age_weeks} weeks</div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="bg-gray-100 px-2 py-1 rounded">Count: {flock.current_count}</span>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${flock.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {flock.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const HealthRecords = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Health Records</h2>
        <p className="text-gray-500">Medical history and vaccination records.</p>
    </div>
);

export const Consultations = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Consultations</h2>
        <p className="text-gray-500">Doctor consultation logs.</p>
    </div>
);

export const SuccessStories = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Success Stories</h2>
        <p className="text-gray-500">Community shared stories.</p>
    </div>
);

export const IntegrationPlaceholder = ({ title }) => (
    <div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-500">Integration settings for {title}.</p>
    </div>
);
