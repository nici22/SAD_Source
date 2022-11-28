import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import filterReducer from './filterSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
};

const persistConfig2 = {
    key: 'filter',
    storage,
};

const auth = persistReducer(persistConfig, authReducer);

const filter = persistReducer(persistConfig2, filterReducer);

export const store = configureStore({
    reducer: { auth, filter },
    middleware: [thunk]
});

export const persistor = persistStore(store);