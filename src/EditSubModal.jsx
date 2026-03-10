import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { dataService } from './api';
import { useToast } from './toast';

const PERIODICITY_OPTIONS = [
    { value: 'DAILY', label: 'Каждый день' },
    { value: 'WEEKLY', label: 'Раз в неделю' },
    { value: 'MONTHLY', label: 'Раз в месяц' },
    { value: 'YEARLY', label: 'Раз в год' },
    { value: 'ANNUALLY', label: 'Ежегодно' },
    { value: 'SEMIANNUALLY', label: 'Раз в полгода' },
];
const STATUS_OPTIONS = [
    { value: 'active', label: 'Активна' },
    { value: 'paused', label: 'На паузе' },
    { value: 'canceled', label: 'Отменена' },
];

const toEnum = (value, fallback = 'MONTHLY') => {
    if (!value) return fallback;
    return String(value).toUpperCase();
};

const EditSubModal = ({ isOpen, onClose, onUpdated, cards, subscriptionId }) => {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [name, setName] = useState('');
    const [periodicity, setPeriodicity] = useState('MONTHLY');
    const [status, setStatus] = useState('active');
    const [cardId, setCardId] = useState('');

    const selectedCard = useMemo(
        () => cards.find((card) => String(card.id) === String(cardId)),
        [cards, cardId]
    );

    useEffect(() => {
        if (!isOpen || !subscriptionId) return;

        let mounted = true;

        const load = async () => {
            setLoading(true);
            setError('');
            try {
                const sub = await dataService.getSubscriptionById(subscriptionId);
                if (!mounted || !sub) return;

                setName(sub.service || sub.name || '');
                setPeriodicity(toEnum(sub.periodicity, 'MONTHLY'));
                setStatus(sub.status || 'active');

                if (sub.cardId) {
                    setCardId(String(sub.cardId));
                } else if (sub.card?.id) {
                    setCardId(String(sub.card.id));
                } else {
                    setCardId('');
                }
            } catch (err) {
                if (mounted) {
                    setError(err.message || 'Не удалось загрузить подписку');
                }
            } finally {
                if (mounted) setLoading(false);
            }
        };

        load();
        return () => {
            mounted = false;
        };
    }, [isOpen, subscriptionId]);

    const handleSave = async (e) => {
        e.preventDefault();

        if (!subscriptionId) return;

        setSaving(true);
        setError('');

        try {
            const requests = [
                dataService.updateSubscriptionPeriodicity(subscriptionId, periodicity),
                dataService.updateSubscriptionStatus(subscriptionId, status),
            ];

            if (selectedCard) {
                requests.push(
                    dataService.updateSubscriptionCard(subscriptionId, {
                        name: selectedCard.name,
                        last4: Number(selectedCard.last4),
                    })
                );
            }

            await Promise.all(requests);
            await onUpdated();
            toast.success(`Подписка ${name || ''} обновлена`);
            onClose();
        } catch (err) {
            setError(err.message || 'Не удалось обновить подписку');
            toast.error(err.message || 'Не удалось обновить подписку');
        } finally {
            setSaving(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <Motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <Motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl"
                    >
                        <h2 className="text-2xl font-black mb-1">Редактирование подписки</h2>
                        <p className="text-sm text-gray-400 mb-6 truncate">{name || '...'}</p>

                        {loading ? (
                            <div className="py-6 text-sm text-gray-500">Загружаем данные подписки...</div>
                        ) : (
                            <form onSubmit={handleSave} className="space-y-4">
                                {error && (
                                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                                        {error}
                                    </div>
                                )}

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
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Статус</label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full px-5 py-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                    >
                                        {STATUS_OPTIONS.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Карта списания</label>
                                    <select
                                        value={cardId}
                                        onChange={(e) => setCardId(e.target.value)}
                                        className="w-full px-5 py-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                    >
                                        <option value="">Не менять</option>
                                        {cards.map((card) => (
                                            <option key={card.id} value={card.id}>
                                                {card.name} (**** {card.last4})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="pt-3 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition"
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 py-4 bg-black text-white rounded-2xl font-bold shadow-lg shadow-gray-200 hover:bg-gray-800 disabled:bg-gray-400 transition"
                                    >
                                        {saving ? 'Сохраняем...' : 'Сохранить'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </Motion.div>
                </Motion.div>
            )}
        </AnimatePresence>
    );
};

export default EditSubModal;

