import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice"
import authReducer from './slices/authSlice'
import {persistReducer, persistStore} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'
// import dotenv from 'dotenv'
// dotenv.config()



// const taskPersistConfig = {
//     key: 'task',
//     storage: storageSession
// }

const authPersistConfig = {
    key: 'auth',
    storage: storageSession,
}

// const persistedReducer = persistReducer(authPersistConfig, authReducer)

const rootReducer = combineReducers({
    authReducer: persistReducer(authPersistConfig, authReducer),        
    taskReducer,
   });
// const persistedReducer = persistReducer(persistConfig, reducers)


export const store = configureStore({
    reducer: rootReducer,
    // devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore ces actions dans la vérification de sérialisation
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
})

export const persistor = persistStore(store)
// export default store;