import React, { useEffect, useState } from 'react';
import { getFlocks } from '../../../services/flockService';
import { RefreshCw } from 'lucide-react';

export const Flocks = () => {
    const [flocks, setFlocks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFlocks = async () => {
        setLoading(true);
        const data = await getFlocks();
        setFlocks(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchFlocks();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Flock Data</h2>
                <button onClick={fetchFlocks} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading flocks...</div>
            ) : flocks.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <p className="text-gray-500 mb-2">No flocks found.</p>
                    <p className="text-sm text-gray-400">Add a flock from the Client App to see it here.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left active-table">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Name</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Count</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Age (Wks)</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {flocks.map((flock) => (
                                <tr key={flock.id} className="hover:bg-gray-50/50">
                                    <td className="p-4 font-medium text-gray-900">{flock.name}</td>
                                    <td className="p-4 text-sm text-gray-600">{flock.type}</td>
                                    <td className="p-4 text-sm text-gray-600">{flock.bird_count}</td>
                                    <td className="p-4 text-sm text-gray-600">{flock.age_weeks}</td>
                                    <td className="p-4 px-6">
                                        <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium border border-emerald-100">
                                            {flock.status || 'Active'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
