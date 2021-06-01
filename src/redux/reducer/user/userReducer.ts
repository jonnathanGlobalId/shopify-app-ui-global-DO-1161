import {userDispatch} from '../../@types/settingsActionTypes';
import {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  CHANGE_CONDITIONS,
  SAVE_GLOBAL_STATE,
  SAVE_GLOBAL_STATE_SUCCESS,
  SAVE_GLOBAL_STATE_FAILURE,
  CHANGE_AMOUNT,
  GET_URL_SHOP
} from '../../types';

interface initialState {
  user: null | OwnerCondition;
  shopUrl: string;
  error: boolean;
  loading: boolean;
  isChanged: boolean;
}

const initialState: initialState = {
  user: null,
  shopUrl: "",
  error: false,
  loading: false,
  isChanged: false,
};

const userReducer = (state: initialState = initialState, action: userDispatch) => {
  switch (action.type) {

  case SAVE_GLOBAL_STATE:
  case GET_USER_INFO:
    return {
      ...state,
      loading: true,
      error: false,
    };

  case GET_USER_INFO_SUCCESS:
    return {
      ...state,
      user: action.payload,
      loading: false,
      error: false,
    };

  case CHANGE_CONDITIONS:
    return {
      ...state,
      user: {...state.user, settings: action.payload},
      isChanged: true,
    };

  case SAVE_GLOBAL_STATE_SUCCESS:
    return {
      ...state,
      user: action.payload,
      isChanged: false,
    };

  case CHANGE_AMOUNT:
    return {
      ...state,
      user: {...state.user, limit_amount: action.payload},
      isChanged: true,
    };

  case SAVE_GLOBAL_STATE_FAILURE:
  case GET_USER_INFO_FAILURE:
    return {
      ...state,
      error: true,
      loading: false,
    };

  case GET_URL_SHOP:
    return {
      ...state,
      shopUrl: action.payload
    }

  default:
    return state
  }
}

export default userReducer;
