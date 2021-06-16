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
import {url} from '../../../utils/links';

export const getUserInfoAction = (owner_id: string, conditionsData: OwnerCondition) => {
  return async (dispatch: Dispatch<GetInfoDispatchTypes>) => {
    try {
      dispatch({
        type: GET_USER_INFO
      });
      console.log('Trayendo los datos del usuario');
      console.log('Desde variables de entorno', url.GLOBAL_ID_API_URL);
      const access_token = await getAccessToken();
      console.log('Token del usuario', access_token);
      const result = await axios.get(`${url.GLOBAL_ID_API_URL}/owner/${owner_id}`, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      dispatch({
        type: GET_USER_INFO_SUCCESS,
        payload: result.data.data
      });
    } catch (error) {
      try {
        conditionsData.shop = conditionsData.shop.split('.')[0];
        const access_token: string = await getAccessToken();
        await axios.put(`${GLOBAL_ID_API_URL}/owner/${owner_id}`, conditionsData, {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });

        dispatch({
          type: GET_USER_INFO_SUCCESS,
          payload: conditionsData
        });
      } catch (error) {
        dispatch({
          type: GET_USER_INFO_FAILURE,
          payload: conditionsData,
        });
      }
    }
  };
};
