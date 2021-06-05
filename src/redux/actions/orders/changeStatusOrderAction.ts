import axios from 'axios';
import moment from 'moment';
import {Dispatch} from 'redux';
import {OrderDispatchTypes} from '../../@types/settingsActionTypes';
import { appState } from '../../reducer';
import {
  CHANGE_ORDER_STATUS,
  CHANGE_ORDER_STATUS_SUCCESS,
  CHANGE_ORDER_STATUS_REJECT,
} from '../../types';

enum Status {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED'
}

export const changeStatusOrderAction = (status: Status, order_id: string, new_id: string) => {
  return async (dispatch: Dispatch<OrderDispatchTypes>, getState: () => appState)  => {
    dispatch({
      type: CHANGE_ORDER_STATUS
    });
    console.log('El nuevo status', status);
    console.log('nuevo id de la orden', new_id);
    const new_order_id = new_id.split('/')[4];
    const dataSend = {
      status,
      order_id: new_order_id,
      purchase_date: Date.now(),
    }
    try {
      await axios.put(`http://localhost:8080/api/order/change-status/${order_id}`, dataSend);
      const array: Order[] = getState().user.orders;
      const arrayPending: Order[] = getState().user.pending_orders;

      const index = array.findIndex((order: Order) => order.order_id === order_id);
      const indexPending = arrayPending.findIndex((order: Order) => order.order_id === order_id);
      console.log('Indice de la lista pendiente', indexPending);
      console.log('Indice de la lista de ordenes', index);

      array[index] = {...array[index], status: status, order_id: dataSend.order_id, customer: {...array[index].customer, purchase_date: moment().toISOString()}}
      arrayPending[indexPending] = {...arrayPending[indexPending], status: status, order_id: dataSend.order_id, customer: {...array[indexPending].customer, purchase_date: moment().toISOString()}}
      const newDataPending = arrayPending.filter((order: Order) => order.status === 'PENDING' );
      
      console.log('Nueva información de la orden', array);
      console.log('Información de la orden pendiente', arrayPending);
      dispatch({
        type: CHANGE_ORDER_STATUS_SUCCESS,
        payload: {
          orders: array,
          pending_orders: newDataPending,
        },
      })

    } catch (error) {
      console.log(error);
      dispatch({
        type: CHANGE_ORDER_STATUS_REJECT,
      });
    }
  }
}

