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
      console.log('Vamos a encontrar el usuario desde la api')
      // const access_token = await getAccessToken();
      // const result = await axios.get(`${GLOBAL_ID_API_URL}/owner/${owner_id}`, {
      //   headers: {
      //     'Authorization': `Bearer ${access_token}`
      //   } 
      // }); 
      const result = await axios.get(`http:localhost:8080/api/user-settings-owner/${owner_id}`);
      console.log(result);
      dispatch({
        type: GET_USER_INFO_SUCCESS,
        payload: result.data.data 
      });
    } catch (error) {
      console.log('No existe el usuario vamos a crearlo');
      try {
        // const access_token: string = await getAccessToken();
        // await axios.put(`${GLOBAL_ID_API_URL}/owner/${owner_id}`, firstData, {
        //   headers: {
        //     'Authorization': `Bearer ${access_token}`
        //   }
        // });
        await axios.put(`http:localhost:8080/api/change-user-settings-owner`, firstData);
        dispatch({
          type: GET_USER_INFO_SUCCESS,
          payload: firstData
        });
      } catch (error) {
        console.log('No se puedo crear al usuario y no existe, manda data mock');
        dispatch({
          type: GET_USER_INFO_FAILURE,
          payload: firstData,
        });
      }
    }
  };
};
