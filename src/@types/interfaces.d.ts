interface Order {
  id: string;
  purchaseId: string;
  purchaseDate?: string;
  customer: Customer
  status: 'PENDING' | 'REJECTED' | 'APPROVED';
}

interface Customer {
  name: string;
  verified: string;
  birthday: string;
  issueDate?: string;
  expirationDate?:string;
}

interface OrderHistory {
  id: string;
  name: string;
  purchase: string;
  verification: string;
  status: string;
}

interface OwnerCondition {
  limit_amount: Number,
  limit_amount_enabled: boolean,
  different_address_enabled: boolean,
}
