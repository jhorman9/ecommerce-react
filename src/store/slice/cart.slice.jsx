import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../components/utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const purchasesSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload;
        }
    }
})

export const cartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig()) //El getconfig es para enviar la key que se consumio desde el local storage de la carpeta utils
      .then((res) => dispatch(setCart(res.data.data.cart.products)))
      .finally(() => dispatch(setIsLoading(false)));
  };

  export const createCartThunk = (productToCart) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .post("https://e-commerce-api.academlo.tech/api/v1/cart", productToCart, getConfig()) //El getconfig es para enviar la key que se consumio desde el local storage de la carpeta utils
      .then((res) => dispatch(cartThunk()))
      .finally(() => dispatch(setIsLoading(false)));
  };

  export const checkOutCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api.academlo.tech/api/v1/purchases', {}, getConfig())
        .then(() => dispatch(setCart([])))
        .finally(() => dispatch(setIsLoading(false)));
  };

  export const deleteProductThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${id}`, getConfig())
        .then(() => dispatch(cartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
  };

  export const signUpThunk = (data) => (dispatch) => {
      dispatch(setIsLoading(true));
      return axios.post('https://e-commerce-api.academlo.tech/api/v1/users', data, getConfig())
          .then(() => dispatch(cartThunk()))
          .finally(() => dispatch(setIsLoading(false)))
  }

export const { setCart } = purchasesSlice.actions;

export default purchasesSlice.reducer;