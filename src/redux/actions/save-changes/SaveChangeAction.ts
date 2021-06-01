import {
  SAVE_GLOBAL_STATE,
  SAVE_GLOBAL_STATE_SUCCESS,
  SAVE_GLOBAL_STATE_FAILURE
} from '../../types';
import axios from 'axios';
import {Dispatch} from 'redux';
import {appState} from '../../reducer';
import {UserDispatchTypes} from '../../@types/settingsActionTypes';

export const saveChangeActions = () => {
  return async (dispatch: Dispatch<UserDispatchTypes>, getState: () => appState) => {
    dispatch({
      type: SAVE_GLOBAL_STATE
    });
    try {
      const user_settings = getState().user.user;
      await axios.post('https://shopify-fake-api.herokuapp.com/api/user-settings', user_settings);
      dispatch({
        type: SAVE_GLOBAL_STATE_SUCCESS,
        payload: user_settings
      });
    } catch (error) {
      dispatch({
        type: SAVE_GLOBAL_STATE_FAILURE
      });
    }
  }
};
