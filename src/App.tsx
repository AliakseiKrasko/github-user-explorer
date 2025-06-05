import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import HistoryPage from "./pages/HistoryPage.tsx";
import UserDetails from "./pages/UserDetails.tsx";

const App: React.FC = () => (
    <Router>
        <nav style={{ padding: 16, background: '#eee' }}>
            <Link to="/" style={{ marginRight: 16 }}>Главная</Link>
            <Link to="/history">История поиска</Link>
        </nav>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/user/:username" element={<UserDetails />} />
        </Routes>
    </Router>
);


export default App;