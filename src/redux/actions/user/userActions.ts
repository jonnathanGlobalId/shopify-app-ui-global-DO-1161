import {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE
} from '../../types';
import axios from 'axios';
import {Dispatch} from 'redux';
import {GetInfoDispatchTypes} from '../../@types/settingsActionTypes';

export const getUserInfoAction = (owner_id: string, conditionsData: OwnerCondition) => {
  return async (dispatch: Dispatch<GetInfoDispatchTypes>) => {
    try {
      dispatch({
        type: GET_USER_INFO
      });
      console.log('Trayendo los datos del usuario');
      const result = await axios.get(`/get-owner-settings/${owner_id}`);
      console.log(result.data);
      const data = {
        owner_id : result.data.data.owner_id,
        name : result.data.data.name,
        shop : result.data.data.shop,
        order_amount_limit : result.data.data.order_amount_limit,
        order_amount_limit_enabled : result.data.data.order_amount_limit_enabled,
        different_address_enabled : result.data.data.different_address_enabled,
      }
      console.log(data);
      dispatch({
        type: GET_USER_INFO_SUCCESS,
        payload: data
      });
    } catch (error) {
      console.log('Hubo un error al encontrar al usuario, creando')
      try {
        conditionsData.shop = conditionsData.shop.split('.')[0];
        await axios.put(`/create-user`, conditionsData);

        dispatch({
          type: GET_USER_INFO_SUCCESS,
          payload: conditionsData
        });
      } catch (error) {
        console.log('Hubo un error al crear al usuario mostrar mock')
        dispatch({
          type: GET_USER_INFO_FAILURE,
          payload: conditionsData,
        });
      }
    }
  };
};
