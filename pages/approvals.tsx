import React from 'react';
import {HeaderTitle, UserApproval} from '../components';
import ApprovalLayout from '../Layout/ApprovalLayout';
import {DummyData} from '../utils/dummyData';

const approvals = () => {
  return (
    <ApprovalLayout>
      <HeaderTitle title="Pending Approvals" subtitle="Approve or deny purchases" />
      {DummyData.map((dummy: DummyData) => (
        <UserApproval dummy={dummy} />
      ))}
    </ApprovalLayout>
  )
}

export default approvals
