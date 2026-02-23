import React, { useState } from 'react';
import { X, Egg } from 'lucide-react';
import { addProductionLog } from '../../services/productionService';

const AddProductionModal = ({ isOpen, onClose, onAdd }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        good_eggs: '',
        bad_eggs: '0',
        notes: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataToSubmit = {
                ...formData,
                good_eggs: Number(formData.good_eggs),
                bad_eggs: Number(formData.bad_eggs),
                date: new Date().toISOString().split('T')[0]
            };

            const newLog = await addProductionLog(dataToSubmit);
            if (newLog) {
                onAdd(newLog);
                onClose();
            }
        } catch (error) {
            console.error("Error adding production log:", error);
            alert("Kumbukumbu hazikuhifadhiwa. Tafadhali jaribu tena: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Ongeza Rekodi ya Mayai</h2>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4 overflow-y-auto flex-1">
                    <form id="production-form" onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Idadi ya Mayai Mazima (Trei/Rejareja)</label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.good_eggs}
                                onChange={(e) => setFormData({ ...formData, good_eggs: e.target.value })}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Jumla ya mayai yote mazima"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mayai Mabovu (Kama yapo)</label>
                            <input
                                type="number"
                                min="0"
                                value={formData.bad_eggs}
                                onChange={(e) => setFormData({ ...formData, bad_eggs: e.target.value })}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Idadi ya mayai yaliyovunjika"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Maelezo (Si lazima)</label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24 resize-none"
                                placeholder="Maelezo yoyote ya ziada..."
                            />
                        </div>
                    </form>
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 border-b-none">
                    <button
                        type="submit"
                        form="production-form"
                        disabled={loading}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors disabled:opacity-70 flex items-center justify-center"
                    >
                        {loading ? 'Inahifadhi...' : 'Hifadhi Rekodi'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductionModal;
