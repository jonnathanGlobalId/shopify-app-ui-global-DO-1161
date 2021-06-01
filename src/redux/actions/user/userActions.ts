import {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE
} from '../../types';
import axios from 'axios';
import {Dispatch} from 'redux';
import {GetInfoDispatchTypes} from '../../@types/settingsActionTypes';
import { GLOBAL_ID_API_URL } from '../../../conf';
import { getAccessToken } from '../../../utils/auth';

export const getUSerInfoAction = (owner_id: string, firstData: OwnerCondition) => {
  return async (dispatch: Dispatch<GetInfoDispatchTypes>) => {
    try {
      dispatch({
        type: GET_USER_INFO
      });
      const access_token = await getAccessToken();
      const result = await axios.get(`${GLOBAL_ID_API_URL}/owner/${owner_id}`, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      console.log(result);
      dispatch({
        type: GET_USER_INFO_SUCCESS,
        payload: result.data.data 
      });
    } catch (error) {
      console.log('Hubo un error al traer los datos del cliente');
      dispatch({
        type: GET_USER_INFO_FAILURE,
        payload: firstData,
      });
    }
  };
};