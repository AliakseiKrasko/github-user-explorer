import React, { useState, useCallback } from 'react';
import styles from './SearchBar.module.css';
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {selectUserLoadingState} from "../../store/selectors.ts";
import {clearUser, clearUserError, fetchGithubUser} from "../../store/userSlice.ts";
import {LoadingStateEnum} from "../../types/github.ts";

const SearchBar: React.FC = () => {
    const [username, setUsername] = useState('');
    const dispatch = useAppDispatch();
    const loadingState = useAppSelector(selectUserLoadingState);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        const trimmedUsername = username.trim();
        if (trimmedUsername) {
            dispatch(fetchGithubUser(trimmedUsername));
        }
    }, [username, dispatch]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);

        // Очищаем данные только если поле полностью пустое
        if (!value.trim()) {
            dispatch(clearUser());
        } else {
            // Очищаем только ошибки, но не делаем поиск
            dispatch(clearUserError());
        }
    }, [dispatch]);

    const isLoading = loadingState === LoadingStateEnum.PENDING;

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputWrap}>
                <div className={styles.inputBox}>
                    <input
                        type="text"
                        value={username}
                        onChange={handleChange}
                        placeholder="Введите GitHub username и нажмите Enter или кнопку Поиск"
                        className={styles.input}
                        disabled={isLoading}
                    />
                    {isLoading && (
                        <div className={styles.loaderWrap}>
                            <div className={styles.loader} />
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={!username.trim() || isLoading}
                    className={styles.button}
                >
                    Поиск
                </button>
            </div>
        </form>
    );
};

export default React.memo(SearchBar);