import React from 'react';
import styles from './LanguageFilter.module.css';
import {getLanguageColor} from "../../../utils/github.ts";

interface LanguageFilterProps {
    languages: string[];
    selectedLanguage: string;
    onLanguageChange: (language: string) => void;
}

const LanguageFilter: React.FC<LanguageFilterProps> = ({
                                                           languages,
                                                           selectedLanguage,
                                                           onLanguageChange,
                                                       }) => {
    if (languages.length === 0) return null;

    return (
        <div className={styles.wrapper}>
            <label className={styles.label}>
                Фильтр по языку:
            </label>
            <div className={styles.buttons}>
                <button
                    onClick={() => onLanguageChange('')}
                    className={`${styles.button} ${!selectedLanguage ? styles.active : ''}`}
                >
                    Все
                </button>
                {languages.map((language) => (
                    <button
                        key={language}
                        onClick={() => onLanguageChange(language)}
                        className={`${styles.button} ${selectedLanguage === language ? styles.active : ''}`}
                    >
                        <span
                            className={styles.dot}
                            style={{ backgroundColor: getLanguageColor(language) }}
                        />
                        {language}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageFilter;