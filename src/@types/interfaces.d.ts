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
  owner_id: string;
  name: string;
  shop: string;
  order_amount_limit: Number;
  order_amount_limit_enabled: boolean;
  different_address_enabled: boolean;
}

interface ShopInfoData {
  id: string;
  myshopifyDomain: string
  name: string;
}
