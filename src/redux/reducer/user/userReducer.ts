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
  GET_ORDERS_SUCCESS,
  GET_ORDERS_REJECT,
  CHANGE_AMOUNT,
  GET_URL_SHOP,
} from '../../types';

interface initialState {
  user: null | OwnerCondition;
  shopUrl: string;
  error: boolean;
  loading: boolean;
  isChanged: boolean;
  orders: [] | Order[];
}

const initialState: initialState = {
  user: null,
  shopUrl: "",
  error: false,
  loading: false,
  isChanged: false,
  orders: [],
};

const userReducer = (state: initialState = initialState, action: userDispatch) => {
  switch (action.type) {

  case CHANGE_ORDER_STATUS:
  case SAVE_GLOBAL_STATE:
  case GET_USER_INFO:
  case GET_ORDERS:  
    return {
      ...state,
      loading: true,
      error: false,
    };

  case GET_USER_INFO_SUCCESS:
  case GET_USER_INFO_FAILURE:  
    return {
      ...state,
      user: action.payload,
      loading: false,
      error: false,
    };

  case CHANGE_CONDITIONS:
    return {
      ...state,
      user: action.payload,
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
      user: {...state.user, order_amount_limit: action.payload},
      isChanged: true,
    };

  case SAVE_GLOBAL_STATE_FAILURE:
  case GET_ORDERS_REJECT:
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
      orders: action.payload
    }

  case CHANGE_ORDER_STATUS_REJECT:
    return {
      ...state,
    }  

  case GET_ORDERS_SUCCESS: 
    return {
      ...state,
      orders: action.payload
    }

  default:
    return state
  }
}

export default userReducer;
