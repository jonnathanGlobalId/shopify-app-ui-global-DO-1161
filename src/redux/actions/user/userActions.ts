import {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE
} from '../../types';
import axios from 'axios';
import {Dispatch} from 'redux';
import {GetInfoDispatchTypes} from '../../@types/settingsActionTypes';

export const getUSerInfoAction = () => {
  return async (dispatch: Dispatch<GetInfoDispatchTypes>) => {
    try {
      dispatch({
        type: GET_USER_INFO
      });
      const result = await axios.get('https://shopify-fake-api.herokuapp.com/api/user-settings');
      dispatch({
        type: GET_USER_INFO_SUCCESS,
        payload: result.data.data
      });
    } catch (error) {
      dispatch({
        type: GET_USER_INFO_FAILURE
      });
    }
  };
};
