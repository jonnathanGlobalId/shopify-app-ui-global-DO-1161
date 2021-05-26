import React from 'react';
import {Dispatch} from 'redux';
import Switch from 'react-ios-switch';
import {useSelector, useDispatch} from 'react-redux';
import { userDispatch } from '../../redux/@types/settingsActionTypes';
import {CHANGE_AMMOUNT} from '../../redux/types';

interface IContitionAuth {
  address: boolean;
  ammount: boolean;
}

const ConditionsGlobalId = () => {
  const dispatch: Dispatch<userDispatch> = useDispatch();
  const userInfo = useSelector((state: any) => state.user);
  const settingsUser = userInfo?.user?.settings;

  const handleChangeconditions = (dataChange: IContitionAuth) => {
    dispatch({type: 'CHANGE_CONDITIONS', payload: dataChange});
  };

  const handleChangeLimitAmmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ammount = Number(e.target.value);
    dispatch({
      type: CHANGE_AMMOUNT,
      payload: ammount,
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
            onChange={handleChangeLimitAmmount}
            value={userInfo?.user?.limit_ammount}
            className="w-24 border-2 border-blue-500 text-blue-500 text-center py-2 rounded-lg ml-3 font-semibold"
          />
        </div>
        <Switch
          onChange={() => handleChangeconditions({...settingsUser, ammount: !settingsUser.ammount})}
          checked={userInfo?.user?.settings?.ammount}
          onColor="#0D51FF"
        />
      </div>
    </div>
  )
}

export default ConditionsGlobalId
