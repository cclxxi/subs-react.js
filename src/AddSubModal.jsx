import { useMemo, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { dataService } from './api';
import { useToast } from './toast';

const PERIODICITY_OPTIONS = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
    { value: 'annually', label: 'Annually' },
    { value: 'semiannually', label: 'Semiannually' },
];

const AddSubModal = ({ isOpen, onClose, onAdded, cards }) => {
    const toast = useToast();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [periodicity, setPeriodicity] = useState('monthly');
    const [cardId, setCardId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const hasCards = useMemo(() => cards.length > 0, [cards]);

    const resetState = () => {
        setName('');
        setPrice('');
        setPeriodicity('monthly');
        setCardId('');
        setError('');
    };

    const handleClose = () => {
        if (!loading) {
            resetState();
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!hasCards) {
            const message = 'Сначала добавьте карту для привязки подписки.';
            setError(message);
            toast.error(message);
            return;
        }

        if (!cardId) {
            const message = 'Выберите карту для списания.';
            setError(message);
            toast.error(message);
            return;
        }

        setLoading(true);
        setError('');

        try {
            await dataService.createSubscription({
                name: name.trim(),
                price: Number(price),
                periodicity,
                cardId,
            });
            await onAdded();
            toast.success('Подписка добавлена');
            handleClose();
        } catch (err) {
            const message = err.message || 'Не удалось добавить подписку';
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <Motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <Motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl"
                    >
                        <h2 className="text-2xl font-black mb-6">Новая подписка</h2>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Сервис</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-5 py-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="Netflix"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Цена</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full px-5 py-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="9.99"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Периодичность</label>
                                <select
                                    value={periodicity}
                                    onChange={(e) => setPeriodicity(e.target.value)}
                                    className="w-full px-5 py-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                >
                                    {PERIODICITY_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Карта</label>
                                <select
                                    value={cardId}
                                    onChange={(e) => setCardId(e.target.value)}
                                    disabled={!hasCards}
                                    className="w-full px-5 py-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-60"
                                >
                                    <option value="">Выберите карту</option>
                                    {cards.map((card) => (
                                        <option key={card.id} value={card.id}>
                                            {card.name} (**** {card.last4})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleClose}
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
            )}
        </AnimatePresence>
    );
};

export default AddSubModal;

