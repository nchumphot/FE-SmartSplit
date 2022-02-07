import axios from "axios";
import { IExpenseForm } from "../interfaces/IExpenseForm";
import { ITransactionAdd } from "../interfaces/ITransactionAdd";
import { baseUrl } from "./baseUrl";
import { verifyAmount } from "./verifyAmount";

export async function handleAddExpense(
  userId: number | undefined,
  details: IExpenseForm,
  transactions: ITransactionAdd[]
): Promise<void> {
  if (verifyAmount(details.amount)) {
    axios.post(baseUrl + `/expenses`, {
      userId: userId,
      description: details.description,
      transactionDate: details.date,
      totalBalance: parseFloat(details.amount),
      notes: details.notes,
      transactions: transactions,
    });
  } else {
    alert("Please enter a valid amount.");
  }
}
