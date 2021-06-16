import axios from 'axios';
import moment from 'moment';
import {Dispatch} from 'redux';
import { GLOBAL_ID_API_URL } from '../../../conf';
import { getAccessToken } from '../../../utils/auth';
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
    const new_order_id = new_id.split('/')[4];
    const dataSend = {
      status,
      order_id: new_order_id,
      purchase_date: Date.now(),
    }
    try {
      const access_token: string = await getAccessToken();
      await axios.put(`${GLOBAL_ID_API_URL}/order/${order_id}`, dataSend, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      const array: Order[] = getState().user.orders;
      const arrayPending: Order[] = getState().user.pending_orders;

      const index = array.findIndex((order: Order) => order.order_id === order_id);
      const indexPending = arrayPending.findIndex((order: Order) => order.order_id === order_id);

      array[index] = {...array[index], status: status, order_id: dataSend.order_id, customer: {...array[index].customer, purchase_date: moment().toISOString()}}
      arrayPending[indexPending] = {...arrayPending[indexPending], status: status, order_id: dataSend.order_id, customer: {...array[indexPending].customer, purchase_date: moment().toISOString()}}
      const newDataPending = arrayPending.filter((order: Order) => order.status === 'PENDING' );

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
