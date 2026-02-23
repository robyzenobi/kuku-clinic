import React, { useState } from 'react';
import { X, Syringe, Skull } from 'lucide-react';
import { addHealthLog } from '../../services/healthService';

const AddHealthModal = ({ isOpen, onClose, onAdd }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: 'Sick',
        diagnosis: '',
        treatment: '',
        mortality_count: 0,
        notes: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataToSubmit = {
                ...formData,
                mortality_count: formData.type === 'Death' ? Number(formData.mortality_count) : 0,
                date: new Date().toISOString().split('T')[0] // Default to today
            };

            const newLog = await addHealthLog(dataToSubmit);
            if (newLog) {
                onAdd(newLog);
                onClose();
            }
        } catch (error) {
            console.error("Error adding health log:", error);
            alert("Kumbukumbu hazikuhifadhiwa. Tafadhali jaribu tena: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Ongeza Rekodi ya Afya</h2>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4 overflow-y-auto flex-1">
                    <form id="health-form" onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Aina ya Rekodi</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Sick', 'Vaccination', 'Death'].map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type })}
                                        className={`p-2 text-sm font-medium rounded-lg border flex flex-col items-center justify-center gap-1 ${formData.type === type
                                                ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                                                : 'bg-white border-gray-200 text-gray-600'
                                            }`}
                                    >
                                        {type === 'Vaccination' ? <Syringe size={16} /> : <Skull size={16} />}
                                        {type === 'Sick' ? 'Ugonjwa' : type === 'Vaccination' ? 'Chanjo' : 'Vifo'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {formData.type === 'Vaccination' ? 'Jina la Chanjo' : 'Ugonjwa/Dalili'}
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.diagnosis}
                                onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder={formData.type === 'Vaccination' ? 'Mf. Newcastle' : 'Mf. Mafua'}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tiba / Matibabu</label>
                            <input
                                type="text"
                                value={formData.treatment}
                                onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Mf. Amoxicillin au Maji pekee"
                            />
                        </div>

                        {formData.type === 'Death' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Idadi ya Vifo</label>
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    value={formData.mortality_count}
                                    onChange={(e) => setFormData({ ...formData, mortality_count: e.target.value })}
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    placeholder="Jumla ya kuku waliokufa"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Maelezo (Si lazima)</label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24 resize-none"
                                placeholder="Andika maelezo ya ziada hapa..."
                            />
                        </div>
                    </form>
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 border-b-none">
                    <button
                        type="submit"
                        form="health-form"
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

export default AddHealthModal;
