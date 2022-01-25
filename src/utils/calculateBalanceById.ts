import { IMoneyBorrowed, IMoneyLent } from "../interfaces/ISummary";

export function calculateBalanceById(
  myId: number,
  friendId: number,
  moneyBorrowed: IMoneyBorrowed[],
  moneyLent: IMoneyLent[]
): number {
  let totalMoneyBorrowed = 0;
  let totalMoneyLent = 0;
  for (const item of moneyBorrowed) {
    if (friendId === item.lender_id && myId !== item.lender_id) {
      totalMoneyBorrowed += parseFloat(item.balance);
    }
  }
  for (const item of moneyLent) {
    if (friendId === item.borrower_id && myId !== item.borrower_id) {
      totalMoneyLent += parseFloat(item.balance);
    }
  }
  return totalMoneyBorrowed - totalMoneyLent;
}
