import React, { useEffect, useState } from 'react';
import { getConsultations } from '../../../services/consultationService';
import { RefreshCw, AlertCircle } from 'lucide-react';

export const Consultations = () => {
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchConsultations = async () => {
        setLoading(true);
        try {
            const data = await getConsultations();
            setConsultations(data || []);
        } catch (error) {
            console.error("Error fetching consultations:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConsultations();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Consultations</h2>
                <button onClick={fetchConsultations} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading consultations...</div>
            ) : consultations.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <p className="text-gray-500 mb-2">No consultations found.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {consultations.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50">
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            {item.is_emergency && <AlertCircle size={16} className="text-red-500" />}
                                            <span className={`font-medium ${item.is_emergency ? 'text-red-600' : 'text-gray-900'}`}>
                                                {item.type || 'General'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${item.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                            item.status === 'completed' ? 'bg-green-50 text-green-700 border-green-100' :
                                                'bg-gray-50 text-gray-600 border-gray-100'
                                            }`}>
                                            {item.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">{formatDate(item.timestamp)}</td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {item.user_id}
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
