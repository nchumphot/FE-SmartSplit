export interface ITransaction {
  id: number;
  expense_id: number;
  description: string;
  transaction_date: string;
  balance: string;
  amount?: number;
}
