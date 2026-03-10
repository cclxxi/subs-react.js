import React from 'react';
import { motion as Motion } from 'framer-motion';

const Landing = ({ onGetStarted }) => {
    return (
        <div className="min-h-screen bg-white text-black overflow-hidden font-sans">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
                <div className="text-2xl font-black tracking-tighter italic">SUB.TRACK</div>
                <button
                    onClick={onGetStarted}
                    className="px-6 py-2 border-2 border-black rounded-full font-bold hover:bg-black hover:text-white transition-all"
                >
                    Войти
                </button>
            </nav>

            {/* Hero Section */}
            <main className="relative pt-20 pb-32 px-6 flex flex-col items-center text-center">
                {/* Декоративный "молодежный" градиентный шар на фоне */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-200 rounded-full blur-[120px] opacity-40 -z-10" />

                <Motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
          <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block border border-indigo-100">
            v1.0 is now live
          </span>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8">
                        ТВОИ ПОДПИСКИ <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              ПОД КОНТРОЛЕМ.
            </span>
                    </h1>
                    <p className="max-w-xl mx-auto text-gray-500 text-lg md:text-xl mb-12">
                        Перестань платить за то, чем не пользуешься. Единая панель управления для всех твоих карт и сервисов.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <Motion.button
                            whileHover={{ y: -5 }}
                            onClick={onGetStarted}
                            className="px-10 py-5 bg-black text-white rounded-3xl font-black text-xl shadow-2xl hover:shadow-indigo-200 transition-all"
                        >
                            Начать бесплатно
                        </Motion.button>
                        <div className="text-sm text-gray-400 font-medium">
                            Присоединяйся к 2,000+ пользователям
                        </div>
                    </div>
                </Motion.div>

                {/* Анимированные карточки-примеры */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
                    {[
                        { name: 'Netflix', price: '12.99$', color: 'bg-red-500' },
                        { name: 'Spotify', price: '9.99$', color: 'bg-green-500' },
                        { name: 'ChatGPT', price: '20.00$', color: 'bg-emerald-600' }
                    ].map((item, i) => (
                        <Motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * i }}
                            className="p-6 bg-white rounded-3xl shadow-xl border border-gray-100 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 ${item.color} rounded-2xl shadow-inner`} />
                                <div className="text-left font-bold">{item.name}</div>
                            </div>
                            <div className="font-black text-indigo-600">{item.price}</div>
                        </Motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Landing;