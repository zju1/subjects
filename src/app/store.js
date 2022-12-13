import {configureStore} from '@reduxjs/toolkit';
import appSlice from './appSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}


const persistedReducer = persistReducer(persistConfig, appSlice)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
});

export const persistor = persistStore(store)

export default store;
