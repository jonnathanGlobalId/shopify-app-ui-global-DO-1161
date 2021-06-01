import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import { ChangeClientId, ChangeShopName, userDispatch } from '../../redux/@types/settingsActionTypes';
import {CHANGE_CLIENT_GLOBALID} from '../../redux/types';

const ConnectGlobalId = () => {
  const userinfo = useSelector((state: any) => state.user);
  const dispatch: Dispatch<ChangeClientId> = useDispatch();

  const handlechangeClientGlobalID = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: CHANGE_CLIENT_GLOBALID,
      payload: e.target.value,
    })
  };

  return (
    <>
      <div className="pl-20 mb-10">
        <h3
          className="font-bold text-gray-600 mb-5 block text-2xl"
        >Connect with youraccount to use GlobalID</h3>
        <button
          className="bg-blue-600 py-6 text-white w-full rounded-full text-2xl font-bold shadow-2xl focus:outline-none"
        >Connect your GlobalID</button>
        <div className="mt-12">
          <div className="flex justify-between">
            <h3 className="font-bold text-gray-600 mb-2 block text-2xl">GlobalID client ID</h3>
            <p className="text-blue-500 cursor-pointer">Where do i find this?</p>
          </div>
          <input
            onChange={handlechangeClientGlobalID}
            value={userinfo?.user?.global_client_id}
            className="rounded-lg bg-gray-200 w-full px-4 py-6 text-2xl mt-3 font-semibold"
            type="text"
            placeholder="The KrutyKrab"
          />
        </div>
      </div>
    </>
  )
}

export default ConnectGlobalId
