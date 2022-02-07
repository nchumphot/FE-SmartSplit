import { IFriend } from "../interfaces/IFriend";
import { ITransaction } from "../interfaces/ITransation";

export function convertAmountToNumber(
  friendInfo: IFriend | undefined,
  setAllTransations: React.Dispatch<React.SetStateAction<ITransaction[]>>
): void {
  if (friendInfo !== undefined) {
    const transactions = [];
    for (const item of friendInfo.moneyBorrowed) {
      const newItem = { ...item, amount: parseFloat(item.balance) };
      transactions.push(newItem);
    }
    for (const item of friendInfo.moneyLent) {
      const newItem = { ...item, amount: -parseFloat(item.balance) };
      transactions.push(newItem);
    }
    setAllTransations(transactions);
  }
}
