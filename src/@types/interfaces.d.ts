interface Order {
  id: string;
  order_id: string;
  owner_id: string;
  customer: Customer
  status: Status;
}
interface Customer {
  customer_id: string;
  name: string;
  verification_status: string;
  date_of_birth: string;
  issue_date?: string;
  purchase_date?: string;
  expiration_date?:string;
}

interface DraftOrder {
  node: {
    completedAt: string;
    createdAt: string;
    email?: string;
    id: string;
    name: string;
  }
}

enum Status {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED'
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
  created_at?: string;
  updated_at?: string;
}

interface ShopInfoData {
  id: string;
  myshopifyDomain: string
  name: string;
}
