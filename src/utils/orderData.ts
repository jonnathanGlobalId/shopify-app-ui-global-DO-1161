export const orderData: Order[] = [
  {
    id: "gid://shopify/Order/3787963170968",
    customer: {
      name: 'Martin Jekyll',
      verified: 'Verified with Onfido',
      birthday: '06/12/1983',
      issueDate: '01/01/2016',
      expirationDate: '01/01/2026',
    },
    purchaseId: '2518940178621',
    purchaseDate: '02/10/2021',
    status: 'APPROVED'
  },
  {
    id: "gid://shopify/Order/3811284549784",
    customer: {
      name: 'Thomas Hyde',
      verified: 'Verified with Onfido',
      birthday: '02/01/2001',
      issueDate: '01/01/2016',
      expirationDate: '01/01/2026',
    },
    purchaseId: '4511743178677',
    purchaseDate: '02/10/2021',
    status: 'PENDING'
  },
  {
    id: "gid://shopify/Order/3850289676440",
    customer: {
      name: 'William Taraval',
      verified: 'Verified with Onfido',
      birthday: '11/15/1996',
      issueDate: '01/01/2016',
      expirationDate: '01/01/2026',
    },
    purchaseId: '3311740238567',
    purchaseDate: '02/10/2021',
    status: 'REJECTED'
  },
];

export const DummyTable: OrderHistory[] = [
  {
    id: 'tx-1',
    name: 'Martin Jekyll',
    purchase: '02/08/2021',
    status: 'Age',
    verification: 'Approved',
  },
  {
    id: 'tx-2',
    name: 'Ty Segal',
    purchase: '02/10/21',
    status: 'Age',
    verification: 'Approved',
  },
  {
    id: 'tx-3',
    name: 'Maria Smith',
    purchase: '02/10/21',
    status: 'Age',
    verification: 'Denied',
  },
]