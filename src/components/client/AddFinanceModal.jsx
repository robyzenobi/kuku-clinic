import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { addFinanceLog } from '../../services/financeService';

const AddFinanceModal = ({ isOpen, onClose, onAdd }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: 'expense',
        category: 'Chakula',
        amount: '',
        description: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataToSubmit = {
                ...formData,
                amount: Number(formData.amount),
                date: new Date().toISOString().split('T')[0]
            };

            const newLog = await addFinanceLog(dataToSubmit);
            if (newLog) {
                onAdd(newLog);
                onClose();
            }
        } catch (error) {
            console.error("Error adding finance log:", error);
            alert("Kumbukumbu hazikuhifadhiwa. Tafadhali jaribu tena: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Ongeza Rekodi ya Fedha</h2>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4 overflow-y-auto flex-1">
                    <form id="finance-form" onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Aina ya Muamala</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: 'income', category: 'Mauzo ya Mayai' })}
                                    className={`p-3 text-sm font-bold rounded-xl border flex items-center justify-center gap-2 transition-all ${formData.type === 'income'
                                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                                            : 'bg-white border-gray-200 text-gray-500'
                                        }`}
                                >
                                    <TrendingUp size={18} />
                                    Mapato
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: 'expense', category: 'Chakula' })}
                                    className={`p-3 text-sm font-bold rounded-xl border flex items-center justify-center gap-2 transition-all ${formData.type === 'expense'
                                            ? 'bg-red-50 border-red-500 text-red-700'
                                            : 'bg-white border-gray-200 text-gray-500'
                                        }`}
                                >
                                    <TrendingDown size={18} />
                                    Matumizi
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kiasi (TZS)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">TSh</span>
                                </div>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    className="w-full pl-12 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kategoria</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                            >
                                {formData.type === 'income' ? (
                                    <>
                                        <option value="Mauzo ya Mayai">Mauzo ya Mayai</option>
                                        <option value="Mauzo ya Kuku">Mauzo ya Kuku</option>
                                        <option value="Mauzo ya Mbolea">Mauzo ya Mbolea</option>
                                        <option value="Mengineyo">Mengineyo</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="Chakula">Chakula</option>
                                        <option value="Dawa/Chanjo">Dawa & Chanjo</option>
                                        <option value="Vifaa">Vifaa vya Shamba</option>
                                        <option value="Usafiri">Usafiri</option>
                                        <option value="Mishahara">Mishahara</option>
                                        <option value="Mengineyo">Mengineyo</option>
                                    </>
                                )}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Maelezo Kamili</label>
                            <input
                                type="text"
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder={formData.type === 'income' ? 'Mf. Trei 15 za mayai makubwa' : 'Mf. Starter Mash kilo 50'}
                            />
                        </div>
                    </form>
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 border-b-none">
                    <button
                        type="submit"
                        form="finance-form"
                        disabled={loading}
                        className={`w-full py-4 font-bold rounded-xl transition-colors disabled:opacity-70 flex items-center justify-center text-white ${formData.type === 'income' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'
                            }`}
                    >
                        {loading ? 'Inahifadhi...' : 'Hifadhi Muamala'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddFinanceModal;
