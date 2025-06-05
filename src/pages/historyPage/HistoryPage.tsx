import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HistoryPage.module.css';
import SearchHistory from "../../components/searchHistory/SearchHistory.tsx";

const HistoryPage: React.FC = () => (
    <div className={styles.screenBg}>
        <div className={styles.container}>
            <div className={styles.headerSection}>
                <Link
                    to="/"
                    className={styles.backLink}
                >
                    <svg className={styles.backIcon} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Назад к поиску
                </Link>

                <div className={styles.titleSection}>
                    <h1 className={styles.title}>
                        История поиска
                    </h1>
                    <p className={styles.subtitle}>
                        Ваши последние поиски пользователей GitHub
                    </p>
                </div>
            </div>

            <div className={styles.card}>
                <SearchHistory />
            </div>
        </div>
    </div>
);

export default HistoryPage;