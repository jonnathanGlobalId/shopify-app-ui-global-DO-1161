const SAVE_GLOBAL_STATE = 'SAVE_GLOBAL_STATE';
const SAVE_GLOBAL_STATE_FAILURE = 'SAVE_GLOBAL_STATE_FAILURE';
const SAVE_GLOBAL_STATE_SUCCESS = 'SAVE_GLOBAL_STATE_SUCCESS';
const GET_USER_INFO = 'GET_USER_INFO';
const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';
const CHANGE_CONDITIONS = 'CHANGE_CONDITIONS';
const CHANGE_AMMOUNT = 'CHANGE_AMMOUNT';

export interface ITSaveChanges {
  readonly type: typeof SAVE_GLOBAL_STATE,
};

export interface ITSaveChangesSuccess {
  readonly type: typeof SAVE_GLOBAL_STATE_SUCCESS,
  payload: any,
};

export interface ITSaveChangesFailure {
  readonly type: typeof SAVE_GLOBAL_STATE_FAILURE,
};

export interface ITGetUserInfo {
  readonly type: typeof GET_USER_INFO,
}

export interface ITGetUserInfoSuccess {
  readonly type: typeof GET_USER_INFO_SUCCESS,
  payload: ITDummyDataApi,
}

export interface ITGetUserInfoFailure {
  readonly type: typeof GET_USER_INFO_FAILURE,
}

export interface ITchangeConditionals {
  readonly type: typeof CHANGE_CONDITIONS,
  payload: ITDummySettings,
}


type userDispatch = 
  ITSaveChanges | 
  ITSaveChangesSuccess | 
  ITSaveChangesFailure | 
  ITchangeConditionals | 
  ITGetUserInfo | 
  ITGetUserInfoSuccess | 
  ITGetUserInfoFailure |
  ITChangeAmmount;

export type GetInfoDispatchTypes = ITGetUserInfo | ITGetUserInfoFailure | ITGetUserInfoSuccess;
export type UserDispatchTypes = ITSaveChanges | ITSaveChangesFailure | ITSaveChangesSuccess;