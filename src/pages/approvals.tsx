import React from 'react';
import {HeaderTitle, UserApproval} from '../components';
import ApprovalLayout from '../Layout/ApprovalLayout';
import {orderData} from '../utils/orderData';
import {useSelector} from 'react-redux';
import { appState } from '../redux/reducer';

const approvals = () => {
  const {orders} = useSelector((state: appState) => state.user)
  console.log('Ordenes de la tienda', orders);
  return (
    <ApprovalLayout>
      <HeaderTitle title="Pending Approvals" subtitle="Approve or deny purchases" />
      {orderData.map((order: Order) => (
        <UserApproval key={order.id} order={order} />
      ))}
    </ApprovalLayout>
  )
}

export default approvals
