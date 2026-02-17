import React from 'react';
import { X, Syringe, Skull, ShoppingBag, Egg, DollarSign } from 'lucide-react';

const RecordActionModal = ({ isOpen, onClose, onAction }) => {
    if (!isOpen) return null;

    const actions = [
        { id: 'death', label: 'Rekodi Vifo', icon: Skull, color: 'text-red-500', bg: 'bg-red-50' },
        { id: 'vaccine', label: 'Rekodi Chanjo', icon: Syringe, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'feed', label: 'Ongeza Chakula', icon: ShoppingBag, color: 'text-orange-500', bg: 'bg-orange-50' },
        { id: 'eggs', label: 'Kusanya Mayai', icon: Egg, color: 'text-yellow-500', bg: 'bg-yellow-50' },
        { id: 'sale', label: 'Rekodi Mauzo', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { id: 'expense', label: 'Rekodi Matumizi', icon: DollarSign, color: 'text-purple-500', bg: 'bg-purple-50' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-slide-up">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Rekodi Mpya</h3>
                    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <X size={20} className="text-gray-600" />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {actions.map((action) => (
                        <button
                            key={action.id}
                            onClick={() => { onAction(action.id); onClose(); }}
                            className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:bg-gray-50 active:scale-95 transition-all"
                        >
                            <div className={`p-3 rounded-full mb-3 ${action.bg} ${action.color}`}>
                                <action.icon size={24} />
                            </div>
                            <span className="font-medium text-gray-700 text-sm">{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecordActionModal;
