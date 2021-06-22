import React from 'react';
import {Dispatch} from 'redux';
import Switch from 'react-ios-switch';
import {useSelector, useDispatch} from 'react-redux';
import { userDispatch } from '../../redux/@types/settingsActionTypes';
import {CHANGE_AMOUNT} from '../../redux/types';
import { appState } from '../../redux/reducer';


const ConditionsGlobalId = () => {
  const dispatch: Dispatch<userDispatch> = useDispatch();
  const user = useSelector((state: appState) => state.user);
  const userInfo: OwnerCondition = user.user;

  const handleChangeconditions = (dataChange: OwnerCondition) => {
    dataChange.order_amount_limit = Number(dataChange.order_amount_limit);
    console.log('Configuraciones del switch', dataChange);
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
          onChange={() => handleChangeconditions({...userInfo, different_address_enabled: !userInfo?.different_address_enabled})}
          checked={userInfo?.different_address_enabled}
          onColor="#0D51FF"
        />
      </div>
      <div className="flex justify-between my-10 items-center">
        <div className="flex items-center">
          <h4 className="text-2xl">Require ID verification for orders above $ </h4>
          <input
            onChange={handleChangeLimitAmount}
            value={Number(userInfo?.order_amount_limit).toFixed().toString()}
            className="w-24 border-2 border-blue-500 text-blue-500 text-center py-2 rounded-lg ml-3 font-semibold"
          />
        </div>
        <Switch
          onChange={() => handleChangeconditions({...userInfo, order_amount_limit_enabled: !userInfo?.order_amount_limit_enabled})}
          checked={userInfo?.order_amount_limit_enabled}
          onColor="#0D51FF"
        />
      </div>
    </div>
  )
}

export default ConditionsGlobalId
