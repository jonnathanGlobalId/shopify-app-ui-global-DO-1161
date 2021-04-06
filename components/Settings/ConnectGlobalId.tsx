import React from 'react'

const ConnectGlobalId = () => {
  return (
    <div>
      <h3
        className="font-semibold text-gray-600 mb-5 block text-2xl"
      >Connect with youraccount to use GlobalID</h3>
      <button 
        className="bg-blue-600 py-6 text-white w-full rounded-full text-2xl font-bold shadow-2xl"
      >Connect your GlobalID</button>
      <div className="mt-12">
        <div className="flex justify-between">
          <h3>GlobalID client ID</h3>
          <p className="text-blue-500 cursor-pointer">Where do i fin this?</p>
        </div>
        <input
          className="rounded-lg bg-gray-200 w-full px-4 py-6 text-2xl mt-5 font-semibold"
          type="text" 
          placeholder="The KrutyKrab" 
          disabled={true} 
        />
      </div>
    </div>
  )
}

export default ConnectGlobalId
