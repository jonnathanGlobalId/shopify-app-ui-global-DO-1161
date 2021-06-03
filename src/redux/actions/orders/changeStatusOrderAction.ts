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

export const changeStatusOrderAction = (status: Status, order_id) => {
  return async (dispatch: Dispatch<OrderDispatchTypes>, getState: () => appState)  => {
    dispatch({
      type: CHANGE_ORDER_STATUS
    });
    try {
      const array: Order[] = getState().user.orders;
      const newArray = [...array];
      const index = array.findIndex((order: Order) => order.order_id === order_id);
      newArray[index] = {...newArray[index], status: status}
      dispatch({
        type: CHANGE_ORDER_STATUS_SUCCESS,
        payload: newArray,
      })

    } catch (error) {
      console.log(error);
      dispatch({
        type: CHANGE_ORDER_STATUS_REJECT,
      });
    }
  }
}

