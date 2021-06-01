import React from 'react';
import {HeaderTitle, UserApproval} from '../components';
import ApprovalLayout from '../Layout/ApprovalLayout';
import {DummyData} from '../utils/dummyData';

const approvals = () => {
  return (
    <ApprovalLayout>
      <HeaderTitle title="Pending Approvals" subtitle="Approve or deny purchases" />
      {DummyData.map((order: Order) => (
        <UserApproval key={order.id} order={order} />
      ))}
    </ApprovalLayout>
  )
}

export default approvals
