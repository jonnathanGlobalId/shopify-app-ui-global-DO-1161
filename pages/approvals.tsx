import React from 'react';
import {HeaderTitle, UserApproval} from '../components';
import ApprovalLayout from '../Layout/ApprovalLayout';
import {DummyData} from '../utils/dummyData';
import {useSelector} from 'react-redux';
import { appState } from '../redux/reducer';

const approvals = () => {
  const {orders} = useSelector((state: appState) => state.user)
  console.log(orders);
  return (
    <ApprovalLayout>
      <HeaderTitle title="Pending Approvals" subtitle="Approve or deny purchases" />
      {orders.map((dummy: DummyData) => (
        <UserApproval key={dummy.id} dummy={dummy} />
      ))}
    </ApprovalLayout>
  )
}

export default approvals
