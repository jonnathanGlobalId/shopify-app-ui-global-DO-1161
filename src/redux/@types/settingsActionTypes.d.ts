const SAVE_GLOBAL_STATE = 'SAVE_GLOBAL_STATE';
const SAVE_GLOBAL_STATE_FAILURE = 'SAVE_GLOBAL_STATE_FAILURE';
const SAVE_GLOBAL_STATE_SUCCESS = 'SAVE_GLOBAL_STATE_SUCCESS';
const GET_USER_INFO = 'GET_USER_INFO';
const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';
const CHANGE_CONDITIONS = 'CHANGE_CONDITIONS';
const CHANGE_AMOUNT = 'CHANGE_AMOUNT';

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
}

export interface ChangeConditionals {
  readonly type: typeof CHANGE_CONDITIONS,
  payload: OwnerSettings,
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
