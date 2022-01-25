import { IUser } from "./IUser";

export interface IFriendSummary extends IUser {
  moneyBorrowed?: number;
  moneyLent?: number;
  balance?: number;
}
