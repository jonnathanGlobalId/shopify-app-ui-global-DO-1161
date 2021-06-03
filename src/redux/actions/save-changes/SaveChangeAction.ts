import {
  SAVE_GLOBAL_STATE,
  SAVE_GLOBAL_STATE_SUCCESS,
  SAVE_GLOBAL_STATE_FAILURE
} from '../../types';
import axios from 'axios';
import {Dispatch} from 'redux';
import {appState} from '../../reducer';
import {UserDispatchTypes} from '../../@types/settingsActionTypes';
import {GLOBAL_ID_API_URL} from '../../../conf'
import { getAccessToken } from '../../../utils/auth';

export const saveChangeActions = () => {
  return async (dispatch: Dispatch<UserDispatchTypes>, getState: () => appState) => {
    dispatch({
      type: SAVE_GLOBAL_STATE
    });
    try {
      const user_settings: OwnerCondition = getState().user.user;
      console.log(user_settings);
      // const access_token: string = await getAccessToken();
      // await axios.put(`${GLOBAL_ID_API_URL}/owner/${user_settings.owner_id}`, user_settings, {
      //   headers: {
      //     'Authorization': `Bearer ${access_token}`
      //   }
      // });
      await axios.put('http:localhost:8080/api/change-user-settings-owner', user_settings);

      dispatch({
        type: SAVE_GLOBAL_STATE_SUCCESS,
        payload: user_settings
      });
    } catch (error) {
      console.log('Hubo un problema al guardar las configuraciones del usuario')
      dispatch({
        type: SAVE_GLOBAL_STATE_FAILURE
      });
    }
  }
};
