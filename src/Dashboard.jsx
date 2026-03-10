import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { dataService } from './api';
import AddCardModal from './AddCardModal';
import AddSubModal from './AddSubModal';
import EditSubModal from './EditSubModal';
import { useToast } from './toast';

const Dashboard = ({ onLogout }) => {
    const toast = useToast();
    const [cards, setCards] = useState([]);
    const [subs, setSubs] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState(() => localStorage.getItem('preferredCurrency') || 'USD');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);
    const [isEditSubOpen, setIsEditSubOpen] = useState(false);
    const [editingSubId, setEditingSubId] = useState(null);

    const refreshData = useCallback(async () => {
        setError('');
        const [cardsData, subsData, upcomingData] = await Promise.all([
            dataService.getCards(),
            dataService.getSubscriptions(),
            dataService.getUpcoming(),
        ]);

        setCards(cardsData || []);
        setSubs(subsData || []);
        setUpcoming(upcomingData || []);
    }, []);

    useEffect(() => {
        let mounted = true;

        const load = async () => {
            try {
                await refreshData();
            } catch (err) {
                if (mounted) {
                    const message = err.message || 'Не удалось загрузить данные';
                    setError(message);
                    toast.error(message);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        load();
        return () => {
            mounted = false;
        };
    }, [refreshData, toast]);

    useEffect(() => {
        localStorage.setItem('preferredCurrency', selectedCurrency);
    }, [selectedCurrency]);

    const totalMonthly = useMemo(() => {
        return subs.reduce((sum, item) => {
            const periodicity = String(item.periodicity || '').toUpperCase();
            if (periodicity !== 'MONTHLY') return sum;
            return sum + convertAmount(Number(item.price || 0), item.currency, selectedCurrency);
        }, 0);
    }, [subs, selectedCurrency]);

    const handleDeleteSub = async (id) => {
        try {
            await dataService.deleteSubscription(id);
            await refreshData();
            toast.success('Подписка удалена');
        } catch (err) {
            toast.error(err.message || 'Не удалось удалить подписку');
        }
    };

    const handleDeleteCard = async (id) => {
        try {
            await dataService.deleteCard(id);
            await refreshData();
            toast.success('Карта удалена');
        } catch (err) {
            toast.error(err.message || 'Не удалось удалить карту');
        }
    };

    const openEditSub = (id) => {
        setEditingSubId(id);
        setIsEditSubOpen(true);
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-white">
                <Motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FBFBFE] flex font-sans">
            <aside className="w-72 bg-white border-r border-gray-100 p-8 flex flex-col justify-between hidden md:flex">
                <div>
                    <div className="text-2xl font-black tracking-tighter mb-12 italic">SUB.TRACK</div>
                    <nav className="space-y-4">
                        <NavItem label="Дашборд" active />
                        <NavItem label={`Карт: ${cards.length}`} />
                        <NavItem label={`Подписок: ${subs.length}`} />
                        <NavItem label={`Ежемес: ${formatMoney(totalMonthly, selectedCurrency)}`} />
                    </nav>
                </div>

                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 text-gray-400 hover:text-red-500 font-bold transition-colors"
                >
                    <span>Выйти</span>
                </button>
            </aside>

            <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Привет! 👋</h1>
                        <p className="text-gray-400 font-medium mt-1">Твои подписки под контролем.</p>
                    </div>
                    <div className="flex gap-3">
                        <select
                            value={selectedCurrency}
                            onChange={(e) => setSelectedCurrency(e.target.value)}
                            className="px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {SUPPORTED_CURRENCIES.map((currency) => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>
                        <Motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsCardModalOpen(true)}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100"
                        >
                            + Карта
                        </Motion.button>
                        <Motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsSubModalOpen(true)}
                            className="px-6 py-3 bg-black text-white rounded-2xl font-bold shadow-xl shadow-gray-200"
                        >
                            + Подписка
                        </Motion.button>
                    </div>
                </header>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <section className="lg:col-span-4 space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-800">Карты</h3>
                            <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{cards.length}</span>
                        </div>

                        <div className="space-y-4">
                            {cards.length > 0 ? (
                                cards.map((card, i) => (
                                    <Motion.div
                                        key={card.id || i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        className="p-6 bg-gradient-to-br from-slate-950 via-gray-900 to-black rounded-[2rem] text-white shadow-2xl ring-1 ring-white/20"
                                    >
                                        <div className="flex justify-between items-start gap-2">
                                            <p className="font-bold tracking-tight text-xs text-white/90 uppercase">{card.name}</p>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteCard(card.id)}
                                                className="text-xs text-red-200 hover:text-red-100"
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                        <p className="mt-8 text-2xl font-semibold tracking-[0.2em] text-white">•••• {card.last4}</p>
                                    </Motion.div>
                                ))
                            ) : (
                                <EmptyState text="Нет привязанных карт" />
                            )}
                        </div>
                    </section>

                    <section className="lg:col-span-8 space-y-6">
                        <h3 className="text-xl font-bold text-gray-800">Активные сервисы</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {subs.length > 0 ? (
                                subs.map((sub, i) => (
                                    <Motion.div
                                        key={sub.id || i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex items-center justify-between p-6 bg-white rounded-3xl border border-gray-100"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-xl shadow-inner">
                                                {getEmoji(sub.service || sub.name)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-lg">{sub.service || sub.name || 'Без названия'}</p>
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                    {formatPeriodicity(sub.periodicity)} {sub.status ? `• ${formatStatus(sub.status)}` : ''}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-black text-gray-900">
                                                {formatMoney(convertAmount(Number(sub.price || 0), sub.currency, selectedCurrency), selectedCurrency)}
                                            </p>
                                            <p className="text-[11px] text-gray-400 mt-1">
                                                {formatMoney(Number(sub.price || 0), normalizeCurrency(sub.currency))}
                                            </p>
                                            <div className="flex gap-2 justify-end mt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => openEditSub(sub.id)}
                                                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200 transition"
                                                >
                                                    Редактировать
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteSub(sub.id)}
                                                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-100 hover:bg-rose-100 hover:border-rose-200 transition"
                                                >
                                                    Удалить
                                                </button>
                                            </div>
                                        </div>
                                    </Motion.div>
                                ))
                            ) : (
                                <EmptyState text="У вас пока нет активных подписок" />
                            )}
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Ближайшие списания</h3>
                            {upcoming.length > 0 ? (
                                <div className="space-y-2">
                                    {upcoming.slice(0, 5).map((item) => (
                                        <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex justify-between">
                                            <span className="font-medium text-gray-800">{item.service || item.name || 'Без названия'}</span>
                                            <span className="font-bold text-indigo-600">
                                                {formatMoney(convertAmount(Number(item.price || 0), item.currency, selectedCurrency), selectedCurrency)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState text="Нет ближайших списаний" />
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <AddCardModal
                isOpen={isCardModalOpen}
                onClose={() => setIsCardModalOpen(false)}
                onAdded={refreshData}
            />

            <AddSubModal
                isOpen={isSubModalOpen}
                onClose={() => setIsSubModalOpen(false)}
                onAdded={refreshData}
                cards={cards}
            />

            <EditSubModal
                isOpen={isEditSubOpen}
                onClose={() => setIsEditSubOpen(false)}
                onUpdated={refreshData}
                cards={cards}
                subscriptionId={editingSubId}
            />
        </div>
    );
};

const NavItem = ({ label, active = false }) => (
    <div
        className={`p-4 rounded-2xl font-bold cursor-pointer transition-all ${
            active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-gray-400 hover:bg-gray-50'
        }`}
    >
        {label}
    </div>
);

const EmptyState = ({ text }) => (
    <div className="py-12 px-6 border-2 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-gray-50 rounded-full mb-3 flex items-center justify-center text-gray-300 italic">?</div>
        <p className="text-gray-400 text-sm font-medium">{text}</p>
    </div>
);

const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'RUB', 'KGS', 'KZT'];

const FX_TO_USD = {
    USD: 1,
    EUR: 1.08,
    RUB: 0.011,
    KGS: 0.011,
    KZT: 0.0021,
};

const normalizeCurrency = (currency) => {
    const code = String(currency || 'USD').toUpperCase();
    return SUPPORTED_CURRENCIES.includes(code) ? code : 'USD';
};

const convertAmount = (amount, fromCurrency, toCurrency) => {
    const from = normalizeCurrency(fromCurrency);
    const to = normalizeCurrency(toCurrency);
    const numericAmount = Number(amount || 0);

    const inUsd = numericAmount * FX_TO_USD[from];
    return inUsd / FX_TO_USD[to];
};

const formatMoney = (amount, currency) => {
    const code = normalizeCurrency(currency);
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: code,
        maximumFractionDigits: 2,
    }).format(Number(amount || 0));
};

const STATUS_LABELS = {
    ACTIVE: 'активна',
    PAUSED: 'на паузе',
    CANCELED: 'отменена',
};

const formatStatus = (value) => {
    const key = String(value || '').toUpperCase();
    return STATUS_LABELS[key] || String(value || '').toLowerCase();
};

const PERIODICITY_LABELS = {
    DAILY: 'раз в день',
    WEEKLY: 'раз в неделю',
    MONTHLY: 'раз в месяц',
    YEARLY: 'раз в год',
    ANNUALLY: 'ежегодно',
    SEMIANNUALLY: 'раз в полгода',
};

const formatPeriodicity = (value) => {
    const key = String(value || '').toUpperCase();
    return PERIODICITY_LABELS[key] || 'период не указан';
};

const getEmoji = (name = '') => {
    const n = name.toLowerCase();
    if (n.includes('spotify')) return '🎵';
    if (n.includes('netflix')) return '📺';
    if (n.includes('chatgpt')) return '🤖';
    if (n.includes('adobe')) return '🎨';
    return '💳';
};

export default Dashboard;
