import React from 'react';
import {HeaderTitle} from '../components';
import MainLayout from '../Layout/MainLayout'
import {useSelector} from 'react-redux';
import { appState } from '../redux/reducer';
import moment from 'moment';

enum Status {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED'
}

const history = () => {
  const ordersState: Order[] = useSelector((state: appState) => state.user.orders);
  const historyOrders: Order[] = ordersState.filter((order: Order) => order.status !== Status.PENDING);
  console.log('Ordenes aprobadas', historyOrders);
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
          {historyOrders.map((order: Order, index) => {
            return(
              <tr key={order.order_id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-4 px-8 text-2xl">{order.customer.name}</td>
                <td className="py-4 px-8 text-2xl">{moment(order.customer.purchase_date).format("DD/MM/YYYY")}</td>
                <td className="py-4 px-8 text-2xl">{order.customer.verification_status}</td>
                <td className="py-4 px-8 text-2xl">{order.status.toLowerCase()}</td>
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
