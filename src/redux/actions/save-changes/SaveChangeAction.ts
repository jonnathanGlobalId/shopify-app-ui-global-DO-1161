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
      const owner_settings: OwnerCondition = getState().user.user;
      console.log(owner_settings);
      const res = await axios.put('/save-settings', owner_settings);
      console.log(res.data);
      dispatch({
        type: SAVE_GLOBAL_STATE_SUCCESS,
        payload: owner_settings
      });
    } catch (error) {
      dispatch({
        type: SAVE_GLOBAL_STATE_FAILURE
      });
    }
  }
};
