import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import { authReducer } from '../redux/reducers/authReducer';
import { productReducer } from '../redux/reducers/productReducer';
import { cartReducer } from '../redux/reducers/cartReducer';

export const store = configureStore({
  reducer: {
    authReducer,
    productReducer,
    cartReducer
  },
});
