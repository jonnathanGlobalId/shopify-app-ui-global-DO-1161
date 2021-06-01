import {userDispatch} from '../../@types/settingsActionTypes';
import {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  CHANGE_CONDITIONS,
  SAVE_GLOBAL_STATE,
  SAVE_GLOBAL_STATE_SUCCESS,
  SAVE_GLOBAL_STATE_FAILURE,
  CHANGE_ORDER_STATUS,
  CHANGE_ORDER_STATUS_SUCCESS,
  CHANGE_ORDER_STATUS_REJECT,
  GET_ORDERS,
  CHANGE_AMOUNT,
  GET_URL_SHOP,
} from '../../types';

interface initialState {
  user: null | OwnerCondition;
  shopUrl: string;
  error: boolean;
  loading: boolean;
  isChanged: boolean;
  orders: null | Order[];
}

const initialState: initialState = {
  user: null,
  shopUrl: "",
  error: false,
  loading: false,
  isChanged: false,
  orders: null,
};

const userReducer = (state: initialState = initialState, action: userDispatch) => {
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
