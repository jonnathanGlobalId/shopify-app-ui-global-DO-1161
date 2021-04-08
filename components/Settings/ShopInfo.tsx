import React, {useRef} from 'react';

const ShopInfo = () => {
  const _inputFile = useRef(null);

  const handleSubmitLogo = () => {
    _inputFile.current.click();
  }

  return (
    <div className="my-10 pl-20">
      <div>
        <h3 className="text-2xl font-bold">Shop name</h3>
        <input
          className="rounded-lg bg-gray-200 w-full px-4 py-6 text-2xl mt-5 font-semibold"
          type="text" 
          placeholder="The KrutyKrab" 
          disabled={true} 
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
