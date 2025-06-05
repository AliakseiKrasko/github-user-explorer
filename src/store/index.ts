import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        // в будущем сюда добавим слайсы (например, user, searchHistory, repos)
    },
});

// Типы для хуков
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;