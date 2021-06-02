import {Dispatch} from 'redux';
import {OrderDispatchTypes} from '../../@types/settingsActionTypes';
import {
  CHANGE_ORDER_STATUS,
  CHANGE_ORDER_STATUS_SUCCESS,
  CHANGE_ORDER_STATUS_REJECT
} from '../../types';

export const changeStatusOrderAction = (status: string, id: string) => {
  return async (dispatch: Dispatch<OrderDispatchTypes>)  => {
    try {
      console.log('estado de las ordenes desde la acción', status, id);
    } catch (error) {
      console.log(error);
    }
  }
}

