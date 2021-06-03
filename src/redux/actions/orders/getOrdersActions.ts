import axios from 'axios';
import {Dispatch} from 'redux';
import { GetOrderDispatchTypes } from '../../@types/settingsActionTypes';
import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_REJECT,
} from '../../types';

export const getOrdersAction = (owner_id: string) => {
  return async (dispatch: Dispatch<GetOrderDispatchTypes>) => {
    dispatch({
      type: GET_ORDERS,
    });
    try {
      console.log('Buscando las ordenes', owner_id);
      const result = await axios.get(`http:localhost:8080/api/orders/${owner_id}`);
      console.log(result.data.data);
      dispatch({
        type: GET_ORDERS_SUCCESS,
        payload: result.data.data
      })
    } catch (error) {
      console.log('Hubo un problema para obtener las ordenes');
      dispatch({
        type: GET_ORDERS_REJECT
      })
    }
  }
}