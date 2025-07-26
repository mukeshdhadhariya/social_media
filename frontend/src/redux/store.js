import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from './authSlice.js';
import postSlice from './postSlice.js'
import socketSlice from'./socketSlice.js'
import chatSlice from './chatSlice.js'
import rtnSlice from './rtnSlice.js'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['socketio']
};

const rootReducer = combineReducers({
  auth: authSlice,
  post:postSlice,
  socketio:socketSlice,
  chat:chatSlice,
  rtn:rtnSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export {persistor };

export default store;

// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import authSlice from './authSlice.js';
// import postSlice from './postSlice.js';

// const rootReducer = combineReducers({
//   auth: authSlice,
//   post: postSlice,
// });


// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;
