const SAVE_GLOBAL_STATE = 'SAVE_GLOBAL_STATE';
const SAVE_GLOBAL_STATE_FAILURE = 'SAVE_GLOBAL_STATE_FAILURE';
const SAVE_GLOBAL_STATE_SUCCESS = 'SAVE_GLOBAL_STATE_SUCCESS';
const GET_USER_INFO = 'GET_USER_INFO';
const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';
const CHANGE_CONDITIONS = 'CHANGE_CONDITIONS';
const CHANGE_AMOUNT = 'CHANGE_AMOUNT';

const CHANGE_ORDER_STATUS = 'CHANGE_ORDER_STATUS';
const CHANGE_ORDER_STATUS_SUCCESS = 'CHANGE_ORDER_STATUS_SUCCESS';
const CHANGE_ORDER_STATUS_REJECT = 'CHANGE_ORDER_STATUS_REJECT';

export interface SaveChanges {
  readonly type: typeof SAVE_GLOBAL_STATE,
};

export interface SaveChangesSuccess {
  readonly type: typeof SAVE_GLOBAL_STATE_SUCCESS,
  payload: any,
};

export interface SaveChangesFailure {
  readonly type: typeof SAVE_GLOBAL_STATE_FAILURE,
};

export interface GetUserInfo {
  readonly type: typeof GET_USER_INFO,
}

export interface GetUserInfoSuccess {
  readonly type: typeof GET_USER_INFO_SUCCESS,
  payload: OwnerCondition,
}

export interface GetUserInfoFailure {
  readonly type: typeof GET_USER_INFO_FAILURE,
  payload: OwnerCondition,
}

export interface ChangeConditionals {
  readonly type: typeof CHANGE_CONDITIONS,
  payload: OwnerSettings,
}
export interface GetOrders {
  readonly type: typeof GET_ORDERS,
  payload: Order[]
}
export interface changeStatusOrder {
  readonly type: typeof CHANGE_ORDER_STATUS,
}
export interface changeStatusOrderSuccess {
  readonly type: typeof CHANGE_ORDER_STATUS_SUCCESS,
  payload: string
}export interface changeStatusOrderFailure {
  readonly type: typeof CHANGE_ORDER_STATUS_REJECT,
  payload: string,
}


type userDispatch =
  SaveChanges |
  SaveChangesSuccess |
  SaveChangesFailure |
  ChangeConditionals |
  GetUserInfo |
  GetUserInfoSuccess |
  GetUserInfoFailure |
  ChangeAmount;

export type GetInfoDispatchTypes = GetUserInfo | GetUserInfoFailure | GetUserInfoSuccess;
export type UserDispatchTypes = SaveChanges | SaveChangesFailure | SaveChangesSuccess;
export type OrderDispatchTypes = changeStatusOrder | changeStatusOrderFailure | changeStatusOrderSuccess;
