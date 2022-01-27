export interface ITransactionShort {
  id: number;
  expense_id: number;
  borrower_id: number;
  lender_id: number;
  balance: string;
  lender_name: string;
  borrower_name: string;
}
