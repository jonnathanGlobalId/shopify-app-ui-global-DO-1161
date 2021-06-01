import React from 'react';
import {HeaderTitle} from '../components';
import MainLayout from '../Layout/MainLayout'
import {DummyTable} from '../utils/dummyData';

const history = () => {
  return (
    <MainLayout>
      <HeaderTitle title="History" subtitle="Customers you approve or deny will appear here" />
      <table className="w-full">
        <thead className="text-left">
          <tr>
            <th className="w-1/4 py-4 px-8 text-3xl">Name</th>
            <th className="w-1/4 py-4 px-8 text-3xl">Purchase date</th>
            <th className="w-1/4 py-4 px-8 text-3xl">Verification type</th>
            <th className="w-1/4 py-4 px-8 text-3xl">Status</th>
          </tr>
        </thead>
        <tbody>
          {DummyTable.map((order: OrderHistory, index) => {
            return(
              <tr key={order.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-4 px-8 text-2xl">{order.name}</td>
                <td className="py-4 px-8 text-2xl">{order.purchase}</td>
                <td className="py-4 px-8 text-2xl">{order.status}</td>
                <td className="py-4 px-8 text-2xl">{order.verification}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-20" />
    </MainLayout>
  )
}

export default history
