/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';

const ToastContext = createContext(null);

let nextId = 1;

const toastStyles = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    error: 'border-red-200 bg-red-50 text-red-800',
    info: 'border-indigo-200 bg-indigo-50 text-indigo-800',
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const pushToast = useCallback((toast) => {
        const id = nextId++;
        const duration = toast.duration ?? 3200;
        setToasts((prev) => [...prev, { id, type: 'info', ...toast }]);

        if (duration > 0) {
            window.setTimeout(() => removeToast(id), duration);
        }

        return id;
    }, [removeToast]);

    const value = useMemo(() => ({
        pushToast,
        success: (message, title = 'Успешно') => pushToast({ type: 'success', title, message }),
        error: (message, title = 'Ошибка') => pushToast({ type: 'error', title, message }),
        info: (message, title = 'Инфо') => pushToast({ type: 'info', title, message }),
    }), [pushToast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="fixed right-4 top-4 z-50 space-y-2 w-[min(92vw,360px)] pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <Motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 24, scale: 0.98 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 24, scale: 0.98 }}
                            className={`pointer-events-auto border rounded-2xl shadow-lg p-4 ${toastStyles[toast.type] || toastStyles.info}`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-sm font-extrabold tracking-tight">{toast.title}</p>
                                    <p className="text-sm mt-1 leading-snug">{toast.message}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeToast(toast.id)}
                                    className="text-xs font-bold opacity-70 hover:opacity-100"
                                >
                                    Закрыть
                                </button>
                            </div>
                        </Motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast должен использоваться внутри ToastProvider');
    }
    return context;
};
