import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { dataService } from './api';
import { useToast } from './toast';

const AddCardModal = ({ isOpen, onClose, onAdded }) => {
    const toast = useToast();
    const [name, setName] = useState('');
    const [last4, setLast4] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^\d{4}$/.test(last4)) {
            toast.error('Введите ровно 4 цифры карты');
            return;
        }

        setLoading(true);
        try {
            await dataService.createCard({ name: name.trim(), last4: Number(last4) });
            await onAdded();
            toast.success('Карта успешно добавлена');
            onClose();
            setName('');
            setLast4('');
        } catch (err) {
            toast.error(err.message || 'Не удалось добавить карту');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay / Задний фон */}
                    <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Content */}
                        <Motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()} // Чтобы не закрывалось при клике на саму модалку
                            className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl"
                        >
                            <h2 className="text-2xl font-black mb-6">Новая карта</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Название (напр. Tinkoff)</label>
                                    <input
                                        type="text" required
                                        value={name}
                                        className="w-full px-5 py-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="My Main Card"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Последние 4 цифры</label>
                                    <input
                                        type="text" required maxLength="4" pattern="\d*"
                                        value={last4}
                                        className="w-full px-5 py-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="4242"
                                        onChange={(e) => setLast4(e.target.value)}
                                    />
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition"
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 py-4 bg-black text-white rounded-2xl font-bold shadow-lg shadow-gray-200 hover:bg-gray-800 disabled:bg-gray-400 transition"
                                    >
                                        {loading ? '...' : 'Добавить'}
                                    </button>
                                </div>
                            </form>
                        </Motion.div>
                    </Motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AddCardModal;