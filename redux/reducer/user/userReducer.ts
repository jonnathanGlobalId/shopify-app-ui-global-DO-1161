import {userDispatch} from '../../@types/settingsActionTypes';
import {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  CHANGE_CONDITIONS,
  SAVE_GLOBAL_STATE,
  SAVE_GLOBAL_STATE_SUCCESS,
  SAVE_GLOBAL_STATE_FAILURE,
  CHANGE_AMMOUNT,
  GETURL_SHOP,
  CHANGE_ORDER_STATUS,
  CHANGE_ORDER_STATUS_SUCCESS,
  CHANGE_ORDER_STATUS_REJECT,
  GET_ORDERS
} from '../../types';

interface ITinitialState {
  user: null | ITDummyDataApi;
  shopUrl: string;
  error: boolean;
  loading: boolean;
  isChanged: boolean;
  orders: null | DummyData[];
}

const initialState: ITinitialState = {
  user: null,
  shopUrl: "",
  error: false,
  loading: false,
  isChanged: false,
  orders: null,
};

const userReducer = (state: ITinitialState = initialState, action: userDispatch) => {
  switch (action.type) {

  case CHANGE_ORDER_STATUS:
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

  case CHANGE_AMMOUNT:
    return {
      ...state,
      user: {...state.user, limit_ammount: action.payload},
      isChanged: true,
    };

  case SAVE_GLOBAL_STATE_FAILURE:
  case GET_USER_INFO_FAILURE:
    return {
      ...state,
      error: true,
      loading: false,
    };

  case GETURL_SHOP:
    return {
      ...state,
      shopUrl: action.payload
    }

  case CHANGE_ORDER_STATUS_SUCCESS:
    return {
      ...state,
      orders: [...state.orders, {...action.payload}]
    }

  case CHANGE_ORDER_STATUS_REJECT:
    return {
      ...state,
      orders: [...state.orders, {...action.payload}]
    }

  case GET_ORDERS: 
    return {
      ...state,
      orders: action.payload
    }

  default:
    return state
  }
}

export default userReducer;