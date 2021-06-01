import React from 'react';
import {Dispatch} from 'redux';
import Switch from 'react-ios-switch';
import {useSelector, useDispatch} from 'react-redux';
import { userDispatch } from '../../redux/@types/settingsActionTypes';
import {CHANGE_AMOUNT} from '../../redux/types';

interface IContitionAuth {
  address: boolean;
  amount: boolean;
}

const ConditionsGlobalId = () => {
  const dispatch: Dispatch<userDispatch> = useDispatch();
  const userInfo = useSelector((state: any) => state.user);
  const settingsUser = userInfo?.user?.settings;

  const handleChangeconditions = (dataChange: IContitionAuth) => {
    dispatch({type: 'CHANGE_CONDITIONS', payload: dataChange});
  };

  const handleChangeLimitAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value);
    dispatch({
      type: CHANGE_AMOUNT,
      payload: amount,
    })
  };

  return (
    <div className="pb-10 px-20">
      <div className="flex justify-between my-10 items-center">
        <h4 className="text-2xl w-11/12 pr-10"
          >Require ID verification for orders when <b>Billing Address</b> does not match <b>Shipping Address?</b>
        </h4>
        <Switch
          onChange={() => handleChangeconditions({...settingsUser, address: !settingsUser.address})}
          checked={userInfo?.user?.settings?.address}
          onColor="#0D51FF"
        />
      </div>
      <div className="flex justify-between my-10 items-center">
        <div className="flex items-center">
          <h4 className="text-2xl">Require ID verification for orders above $ </h4>
          <input
            onChange={handleChangeLimitAmount}
            value={userInfo?.user?.limit_amount}
            className="w-24 border-2 border-blue-500 text-blue-500 text-center py-2 rounded-lg ml-3 font-semibold"
          />
        </div>
        <Switch
          onChange={() => handleChangeconditions({...settingsUser, amount: !settingsUser.amount})}
          checked={userInfo?.user?.settings?.amount}
          onColor="#0D51FF"
        />
      </div>
    </div>
  )
}

export default ConditionsGlobalId
