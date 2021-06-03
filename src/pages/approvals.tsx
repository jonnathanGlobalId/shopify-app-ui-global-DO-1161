import React from 'react';
import {HeaderTitle, UserApproval} from '../components';
import ApprovalLayout from '../Layout/ApprovalLayout';
import {orderData} from '../utils/orderData';
import {useSelector} from 'react-redux';
import { appState } from '../redux/reducer';

const approvals = () => {
  const userstate = useSelector((state: appState) => state.user)

  return (
    <ApprovalLayout>
      <HeaderTitle title="Pending Approvals" subtitle="Approve or deny purchases" />
      {userstate?.orders.map((order: Order, position: Number) => (
        <UserApproval key={order.order_id} order={order} position={position} />
      ))}
    </ApprovalLayout>
  )
}

export default approvals
