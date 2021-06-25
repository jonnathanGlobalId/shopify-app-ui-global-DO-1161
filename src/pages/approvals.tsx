import React from 'react';
import {HeaderTitle, UserApproval} from '../components';
import ApprovalLayout from '../Layout/ApprovalLayout';
import {useSelector} from 'react-redux';
import { appState } from '../redux/reducer';
import {initialState} from '../redux/reducer/user/userReducer';

enum Status {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED'
}

const approvals = () => {
  const userstate: initialState  = useSelector((state: appState) => state.user)
  // const pendindOrder: Order[] = userstate.pending_orders.filter((order: Order) => order.status === Status.PENDING); 
  // console.log('Desde pagina approvals', pendindOrder);
  return (
    <ApprovalLayout>
      <HeaderTitle title="Pending Approvals" subtitle="Approve or deny purchases" />
      {userstate.pending_orders.map((order: Order, position: Number) => (
        <UserApproval key={order.order_id} order={order} position={position} />
      ))}
    </ApprovalLayout>
  )
}

export default approvals
