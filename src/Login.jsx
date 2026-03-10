import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { authService } from './api.js';
import { useToast } from './toast';

const Login = ({ onSwitch, onLoginSuccess }) => {
    const toast = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authService.login({ email, password });
            toast.success('Вы успешно вошли');
            onLoginSuccess();
        } catch (err) {
            toast.error(err.message || 'Ошибка входа');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] p-4">
            <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-white/20"
            >
                <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">С возвращением!</h2>
                <p className="text-gray-400 mb-8">Рады видеть тебя снова ✨</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email" placeholder="Email" required
                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-400"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password" placeholder="Пароль" required
                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-400"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-black text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                    >
                        {loading ? 'Входим...' : 'Войти'}
                    </Motion.button>
                </form>

                <button onClick={onSwitch} className="w-full mt-6 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                    Еще нет аккаунта? <span className="font-bold">Создать</span>
                </button>
            </Motion.div>
        </div>
    );
};

export default Login;