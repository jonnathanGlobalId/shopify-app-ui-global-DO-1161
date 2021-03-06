import axios from 'axios';
import moment from 'moment';
import {Dispatch} from 'redux';
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

      // Change status order and create orders pending;
      const array: Order[] = getState().user.orders;
      const arrayPending: Order[] = getState().user.pending_orders;

      const index = array.findIndex((order: Order) => order.order_id === order_id);
      const indexPending = arrayPending.findIndex((order: Order) => order.order_id === order_id);

      array[index] = {...array[index], status: status, customer: {...array[index].customer, purchase_date: moment().toISOString()}}
      arrayPending[indexPending] = {...arrayPending[indexPending], status: status, customer: {...array[indexPending].customer, purchase_date: moment().toISOString()}}

      if (status === Status.REJECTED) {
        const data = {
          order_id,
          status,
          purchase_date: Date.now(),
        }
        console.log('Cancelando orden', data);
        await axios.post('/delete-order', data);
      };

      if (status === Status.APPROVED) {
        const data = {
          location: userState.location,
          status,
          order_id,
        }
        console.log('Aprovando orden', data);
        await axios.post('/complete-order', data);
      }
      
      dispatch({
        type: CHANGE_ORDER_STATUS_SUCCESS,
        payload: {
          orders: array,
          pending_orders: arrayPending,
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
