import React from 'react';
import { HeaderTitle } from '../components';
import MainLayout from '../Layout/MainLayout'

const history = () => {
  return (
    <MainLayout>
      <HeaderTitle title="History" subtitle="Customers you approve or deny will appear here" />
      <div className="flex pl-20">
        <h3 className="w-1/4 font-bold text-gray-700 text-2xl">Name</h3>
        <h3 className="w-1/4 font-bold text-gray-700 text-2xl">Purchase date</h3>
        <h3 className="w-1/4 font-bold text-gray-700 text-2xl">Verification type</h3>
        <h3 className="w-1/4 font-bold text-gray-700 text-2xl">Status</h3>
      </div>
    </MainLayout>
  )
}

export default history
