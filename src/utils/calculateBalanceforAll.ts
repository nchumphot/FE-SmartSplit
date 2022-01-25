import { IUser } from "../interfaces/IUser";
import { IFriendSummary } from "../interfaces/IFriendSummary";
import { calculateBalanceById } from "./calculateBalanceById";
import { ISummary } from "../interfaces/ISummary";

export function calculateBalanceForAll(
  userId: number,
  people: IUser[],
  summary: ISummary
): IFriendSummary[] {
  const result: IFriendSummary[] = [];
  for (const person of people) {
    result.push({
      ...person,
      balance: calculateBalanceById(
        userId,
        person.id,
        summary.moneyBorrowed,
        summary.moneyLent
      ),
    });
  }
  return result;
}
