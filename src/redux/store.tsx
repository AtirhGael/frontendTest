import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../redux/data/ProductData';
import userSlice from '../redux/data/User'
import authenticate from '../redux/data/authSlice'
import productByOwnerSlice from '../redux/data/GetProductByOwnerData'

const store = configureStore({
  reducer: {
    products: productReducer,
    users: userSlice,
    authSlice:authenticate,
    productByOwnerSlice:productByOwnerSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
