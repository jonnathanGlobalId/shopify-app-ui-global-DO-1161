import axios from 'axios';
import {Dispatch} from 'redux';
import {OrderDispatchTypes} from '../../@types/settingsActionTypes';
import { appState } from '../../reducer';
import {
  CHANGE_ORDER_STATUS,
  CHANGE_ORDER_STATUS_SUCCESS,
  CHANGE_ORDER_STATUS_REJECT
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
    console.log('nuevo id de la orden', new_id);
    const new_order_id = new_id.split('/')[4];
    const dataSend = {
      status,
      order_id: new_order_id,
      purchase_dare: Date.now(),
    }
    try {
      await axios.put(`http://localhost:8080/api/order/change-status/${order_id}`, dataSend);
      const array: Order[] = getState().user.orders;
      const index = array.findIndex((order: Order) => order.order_id === order_id);
      array[index] = {...array[index], status: status, order_id: dataSend.order_id}
      console.log(array);
      dispatch({
        type: CHANGE_ORDER_STATUS_SUCCESS,
        payload: array,
      })

    } catch (error) {
      console.log(error);
      dispatch({
        type: CHANGE_ORDER_STATUS_REJECT,
      });
    }
  }
}

