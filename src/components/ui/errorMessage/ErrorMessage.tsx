import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
    onDismiss?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, onDismiss }) => (
    <div className={styles.errorBox}>
        <div className={styles.errorRow}>
            <div className={styles.iconBox}>
                <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            </div>
            <div className={styles.content}>
                <p className={styles.text}>{message}</p>
                <div className={styles.controls}>
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className={styles.action}
                        >
                            Повторить
                        </button>
                    )}
                    {onDismiss && (
                        <button
                            onClick={onDismiss}
                            className={styles.action}
                        >
                            Скрыть
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
);

export default ErrorMessage;