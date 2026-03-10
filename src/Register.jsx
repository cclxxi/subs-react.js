import React, { useState } from 'react';
import { authService } from './api.js';
import { useToast } from './toast';

const Register = ({ onSwitch }) => {
    const toast = useToast();
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authService.register(formData);
            toast.success('Регистрация успешна! Теперь войдите.');
            onSwitch();
        } catch (err) {
            const message = err.message || 'Ошибка регистрации';
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Создать аккаунт</h2>
                    <p className="text-gray-500 mt-2">Начните контролировать свои подписки</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                            <input
                                type="text" name="name" required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                            <input
                                type="text" name="surname" required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email" name="email" required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            placeholder="you@example.com"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                        <input
                            type="password" name="password" required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition shadow-md ${
                            loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'
                        }`}
                    >
                        {loading ? 'Создание...' : 'Зарегистрироваться'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Уже есть аккаунт?{' '}
                    <button onClick={onSwitch} className="text-indigo-600 font-bold hover:underline">
                        Войти
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;