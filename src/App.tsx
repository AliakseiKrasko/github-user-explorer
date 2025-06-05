import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './pages/Home';
import UserDetails from './pages/UserDetails';
import HistoryPage from './pages/HistoryPage';
import Navigation from './components/Navigation';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/user/:username" element={<UserDetails />} />
                        <Route path="/history" element={<HistoryPage />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
};

export default App;