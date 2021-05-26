interface DummyData {
  id: number;
  name: string;
  verified: string;
  birthday: string;
  purchaseId: string;
  issueDate?: string;
  purchaseDate?: string;
  expirationDate?:string;
  status: 'PENDING' | 'REJECTED' | 'APPROVED';
}

interface DummyTable {
  id: string;
  name: string;
  purchase: string;
  verification: string;
  status: string;
}

interface ITDummyDataApi {
  limit_ammount: Number,
  settings: ITDummySettings
}

interface ITDummySettings {
  address: boolean,
  ammount: boolean,
}