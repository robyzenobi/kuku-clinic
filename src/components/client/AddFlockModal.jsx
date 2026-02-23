import React, { useState } from 'react';
import { X } from 'lucide-react';
import { addFlock } from '../../services/flockService';

const AddFlockModal = ({ isOpen, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        type: 'Layers',
        bird_count: '',
        age_weeks: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const count = Number(formData.bird_count);
        const result = await addFlock({
            name: formData.name,
            type: formData.type,
            initial_count: count,
            current_count: count,
            age_weeks: Number(formData.age_weeks)
        });
        setLoading(false);
        if (result.success) {
            alert("Kundi limerekodiwa kikamilifu!");
            setFormData({ name: '', type: 'Layers', bird_count: '', age_weeks: '' });
            onSuccess();
            onClose();
        } else {
            alert(`Imeshindwa: ${result.error || 'Jaribu tena baadaye.'}`);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl animate-in slide-in-from-bottom-5">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Add New Flock</h2>
                    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Flock Name</label>
                        <input
                            type="text"
                            required
                            className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="e.g., Kuku wa Mayai A"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                                className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option>Layers</option>
                                <option>Broilers</option>
                                <option>Kienyeji</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Count</label>
                            <input
                                type="number"
                                required
                                className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="100"
                                value={formData.bird_count}
                                onChange={(e) => setFormData({ ...formData, bird_count: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Age (Weeks)</label>
                        <input
                            type="number"
                            required
                            className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="12"
                            value={formData.age_weeks}
                            onChange={(e) => setFormData({ ...formData, age_weeks: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all mt-4"
                    >
                        {loading ? 'Adding...' : 'Add Flock'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddFlockModal;
