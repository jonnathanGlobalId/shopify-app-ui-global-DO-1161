import axios from 'axios';
import moment from 'moment';
import {Dispatch} from 'redux';
import { GLOBAL_ID_API_URL } from '../../../conf';
import { getAccessToken } from '../../../utils/auth';
import {OrderDispatchTypes} from '../../@types/settingsActionTypes';
import { appState } from '../../reducer';
import { initialState } from '../../reducer/user/userReducer';
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
    const userState: initialState = getState().user;

    try {
      if (status === Status.REJECTED) {
        console.log('Cancelando la orden');
        const data = {
          order_id,
          status,
          purchase_date: Date.now(),
        }
        await axios.post('/delete-order', data);
      };

      if (status === Status.APPROVED) {
        console.log('Aprovando la orden');
        const data = {
          location: userState.location,
          status,
          order_id,
        }
        await axios.post('/complete-order', data);
      }
      // const res = await axios.put(`http://localhost:3001/api/order/change-status/${order_id}`, dataSend);
      // console.log('Cambiando el status de la orden', res.data);

      // Change status order and create orders pending;
      // const array: Order[] = getState().user.orders;
      // const arrayPending: Order[] = getState().user.pending_orders;

      // const index = array.findIndex((order: Order) => order.order_id === order_id);
      // const indexPending = arrayPending.findIndex((order: Order) => order.order_id === order_id);

      // array[index] = {...array[index], status: status, customer: {...array[index].customer, purchase_date: moment().toISOString()}}
      // arrayPending[indexPending] = {...arrayPending[indexPending], status: status, customer: {...array[indexPending].customer, purchase_date: moment().toISOString()}}
      // const newDataPending = arrayPending.filter((order: Order) => order.status === 'PENDING' );

      // dispatch({
      //   type: CHANGE_ORDER_STATUS_SUCCESS,
      //   payload: {
      //     orders: array,
      //     pending_orders: newDataPending,
      //   },
      // })

    } catch (error) {
      console.log(error);
      dispatch({
        type: CHANGE_ORDER_STATUS_REJECT,
      });
    }
  }
}
