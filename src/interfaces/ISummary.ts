import { IUser } from "./IUser";

export interface IMoneyBorrowed {
  lender_id: number;
  balance: string;
  lender_name: string;
}

export interface IMoneyLent {
  borrower_id: number;
  balance: string;
  borrower_name: string;
}

export interface ISummary {
  friends: IUser[];
  info: IUser;
  moneyBorrowed: IMoneyBorrowed[];
  moneyLent: IMoneyLent[];
}
