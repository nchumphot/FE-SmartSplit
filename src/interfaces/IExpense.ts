export interface IExpense {
  id: number;
  user_id: number;
  description: string;
  transaction_date: string;
  creation_date: string;
  total_balance: string;
  notes: string | null;
  user_name: string;
}
