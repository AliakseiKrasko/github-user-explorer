import React from 'react';
import SearchHistory from '../components/SearchHistory';

const HistoryPage: React.FC = () => (
    <div style={{ maxWidth: 480, margin: '40px auto', padding: 24, background: '#fafafa', borderRadius: 8 }}>
        <h1>История поиска пользователей GitHub</h1>
        <SearchHistory />
    </div>
);

export default HistoryPage;