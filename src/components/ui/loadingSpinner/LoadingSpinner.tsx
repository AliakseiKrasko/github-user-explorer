import React from 'react';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', text }) => {
    const sizeClasses = {
        small: styles.small,
        medium: styles.medium,
        large: styles.large,
    };

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.spinner} ${sizeClasses[size]}`} />
            {text && <p className={styles.text}>{text}</p>}
        </div>
    );
};

export default LoadingSpinner;