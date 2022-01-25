export interface ITransaction {
  id: number;
  description: string;
  transaction_date: string;
  balance: string;
  amount?: number;
}
