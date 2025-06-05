import React from 'react';
import { getLanguageColor } from '../../utils/github';

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
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Фильтр по языку:
            </label>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onLanguageChange('')}
                    className={`px-3 py-1 text-sm rounded-full border ${
                        !selectedLanguage
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                >
                    Все
                </button>
                {languages.map((language) => (
                    <button
                        key={language}
                        onClick={() => onLanguageChange(language)}
                        className={`px-3 py-1 text-sm rounded-full border flex items-center gap-2 ${
                            selectedLanguage === language
                                ? 'bg-blue-100 text-blue-800 border-blue-300'
                                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                        }`}
                    >
                        <span
                            className="w-3 h-3 rounded-full"
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