import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './pages/home/Home.tsx';
import UserDetails from './pages/userDetails/UserDetails.tsx';
import HistoryPage from './pages/historyPage/HistoryPage.tsx';
import Navigation from './components/navigation/Navigation.tsx';

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