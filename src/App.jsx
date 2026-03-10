import React, { useState } from 'react';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import Dashboard from "./Dashboard.jsx";

function App() {
    const [view, setView] = useState(localStorage.getItem('token') ? 'dashboard' : 'landing');

    const logout = () => {
        localStorage.removeItem('token');
        setView('landing');
    };

    return (
        <div className="App font-sans">
            {view === 'landing' && <Landing onGetStarted={() => setView('login')} />}

            {view === 'login' && (
                <Login
                    onSwitch={() => setView('register')}
                    onLoginSuccess={() => setView('dashboard')}
                />
            )}

            {view === 'register' && <Register onSwitch={() => setView('login')} />}

            {view === 'dashboard' && <Dashboard onLogout={logout} />}
        </div>
    );
}

export default App;