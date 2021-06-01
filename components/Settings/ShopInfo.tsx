import React, {useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {CHANGE_SHOP_NAME} from '../../redux/types';
import {Dispatch} from 'redux';
import {ChangeShopName} from '../../redux/@types/settingsActionTypes';

const ShopInfo = () => {
  const _inputFile = useRef(null);
  const dispatch: Dispatch<ChangeShopName> = useDispatch();
  const userInfo = useSelector((state: any) => state.user);

  const handleSubmitLogo = () => {
    _inputFile.current.click();
  }

  const handleChangeShopName = (e:  React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: CHANGE_SHOP_NAME,
      payload: e.target.value,
    })
  }

  return (
    <div className="my-10 pl-20">
      <div>
        <h3 className="text-2xl font-bold">Shop name</h3>
        <input
          className="rounded-lg bg-gray-200 w-full px-4 py-6 text-2xl mt-5 font-semibold"
          type="text"
          onChange={handleChangeShopName}
          value={userInfo?.user?.shop_name}
          placeholder="The KrutyKrab"
        />
      </div>
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-5">Shop Logo</h3>
        <div onClick={handleSubmitLogo} className="w-full h-48 dashed-custom rounded-2xl flex items-center px-10 cursor-pointer">
          <input ref={_inputFile} type="file" className="hidden" name="" id="logo" />
          <div>
            <div className="w-36 h-36 rounded-xl bg-white mr-10 prueba">
              <img src={'https://www.btklsby.go.id/images/placeholder/basic.png'} alt=""/>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-black text-4xl"><span className="text-blue-600">Browse</span> to upload a logo</h3>
            <p>Only transparent PNGs accepted.
                Minimum 168x132 px or 14x11 mm (300 DPI)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopInfo
