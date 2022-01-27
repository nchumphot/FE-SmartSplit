import axios from "axios";
import { IExpenseForm } from "../interfaces/IExpenseForm";
import { ITransactionAdd } from "../interfaces/ITransactionAdd";
import { baseUrl } from "./baseUrl";

export async function handleAddExpense(
  userId: number | undefined,
  details: IExpenseForm,
  transactions: ITransactionAdd[]
): Promise<void> {
  axios.post(baseUrl + `/expenses`, {
    userId: userId,
    description: details.description,
    transactionDate: details.date,
    totalBalance: details.amount,
    notes: details.notes,
    transactions: transactions,
  });
}
