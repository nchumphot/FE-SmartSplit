import { ISummary } from "../interfaces/ISummary";

export function calculateSummary(summary: ISummary, userId: number): number[] {
  let totalMoneyBorrowed = 0;
  let totalMoneyLent = 0;
  for (const item of summary.moneyBorrowed) {
    if (item.lender_id !== userId) {
      totalMoneyBorrowed += parseFloat(item.balance);
    }
  }
  for (const item of summary.moneyLent) {
    if (item.borrower_id !== userId) {
      totalMoneyLent += parseFloat(item.balance);
    }
  }
  return [totalMoneyBorrowed, totalMoneyLent];
}
