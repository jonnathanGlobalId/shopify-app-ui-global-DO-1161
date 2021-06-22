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

export const changeStatusOrderAction = (status: Status, order_id: string) => {
  return async (dispatch: Dispatch<OrderDispatchTypes>, getState: () => appState)  => {
    dispatch({
      type: CHANGE_ORDER_STATUS
    });
    const dataSend = {
      status,
      purchase_date: Date.now(),
    }
    try {
      // const access_token: string = await getAccessToken();
      // await axios.put(`${GLOBAL_ID_API_URL}/order/${order_id}`, dataSend, {
      //   headers: {
      //     'Authorization': `Bearer ${access_token}`
      //   }
      // });
      const res = await axios.put(`http://localhost:3001/api/order/change-status/${order_id}`, dataSend);
      console.log('Cambiando el status de la orden', res.data);
      const array: Order[] = getState().user.orders;
      const arrayPending: Order[] = getState().user.pending_orders;

      const index = array.findIndex((order: Order) => order.order_id === order_id);
      const indexPending = arrayPending.findIndex((order: Order) => order.order_id === order_id);

      array[index] = {...array[index], status: status, customer: {...array[index].customer, purchase_date: moment().toISOString()}}
      arrayPending[indexPending] = {...arrayPending[indexPending], status: status, customer: {...array[indexPending].customer, purchase_date: moment().toISOString()}}
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
