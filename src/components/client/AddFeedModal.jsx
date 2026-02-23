import React, { useState } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { addFeedLog } from '../../services/feedService';

const AddFeedModal = ({ isOpen, onClose, onAdd }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        feed_type: 'Mash', // Default type
        quantity_kg: '',
        cost: '',
        notes: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataToSubmit = {
                ...formData,
                quantity_kg: Number(formData.quantity_kg),
                cost: formData.cost ? Number(formData.cost) : null,
                date: new Date().toISOString().split('T')[0]
            };

            const newLog = await addFeedLog(dataToSubmit);
            if (newLog) {
                onAdd(newLog);
                onClose();
            }
        } catch (error) {
            console.error("Error adding feed log:", error);
            alert("Kumbukumbu hazikuhifadhiwa. Tafadhali jaribu tena: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Ongeza Rekodi ya Chakula</h2>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4 overflow-y-auto flex-1">
                    <form id="feed-form" onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Aina ya Chakula</label>
                            <input
                                type="text"
                                required
                                value={formData.feed_type}
                                onChange={(e) => setFormData({ ...formData, feed_type: e.target.value })}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Mf. Starter Mash, Growers, au Pellets"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kiasi (Kilo)</label>
                            <input
                                type="number"
                                required
                                min="0.1"
                                step="0.1"
                                value={formData.quantity_kg}
                                onChange={(e) => setFormData({ ...formData, quantity_kg: e.target.value })}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Kiasi kilichotumiwa"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gharama (TZS) - Si lazima</label>
                            <input
                                type="number"
                                min="0"
                                value={formData.cost}
                                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Kama umenunua leo"
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
                        form="feed-form"
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

export default AddFeedModal;
