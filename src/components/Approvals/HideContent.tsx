import React from 'react';
import moment from 'moment';

interface propsHideContent {
  issueDate: string;
  expirationDate?: string;
  purchaseDate?: string;
}

const HideContent: React.FC<propsHideContent> = (props) => {
  const {expirationDate, purchaseDate, issueDate} = props;
  return (
    <div className="w-full">
      <div className="flex w-full justify-between">
        <div className="mb-10">
          <h3 className="text-4xl text-gray-500 font-bold mb-8">Issue date</h3>
          <h5 className="text-3xl">{moment(issueDate).format("DD/MM/YYYY")}</h5>
        </div>
        <div className="mb-10">
          <h3 className="text-4xl text-gray-500 font-bold mb-8">Purchase date</h3>
          <h5 className="text-3xl">{purchaseDate ? moment(purchaseDate.toString()).format("DD/MM/YYYY") : '' }</h5>
        </div>
      </div>
      <div className="w-1/2 mb-10">
        <h3 className="text-4xl text-gray-500 font-bold mb-8">Expiration date</h3>
        <h5 className="text-3xl">{moment(expirationDate).format("DD/MM/YYYY")}</h5>
      </div>
    </div>
  )
}

export default HideContent
