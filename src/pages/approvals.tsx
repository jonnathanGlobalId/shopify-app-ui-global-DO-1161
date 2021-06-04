import React from 'react';
import {HeaderTitle, UserApproval} from '../components';
import ApprovalLayout from '../Layout/ApprovalLayout';
import {useSelector} from 'react-redux';
import { appState } from '../redux/reducer';

enum Status {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED'
}

const approvals = () => {
  const userstate = useSelector((state: appState) => state.user)
  const penddingApprovals = userstate?.orders.filter((order: Order) => order.status === Status.PENDING);

  return (
    <ApprovalLayout>
      <HeaderTitle title="Pending Approvals" subtitle="Approve or deny purchases" />
      {penddingApprovals.orders.map((order: Order, position: Number) => (
        <UserApproval key={order.order_id} order={order} position={position} />
      ))}
    </ApprovalLayout>
  )
}

export default approvals
