import { IUser } from "./IUser";

interface ITransaction {
  id: number;
  description: string;
  transaction_date: string;
  balance: string;
}

export interface IFriend {
  info: IUser[];
  moneyBorrowed: ITransaction[];
  moneyLent: ITransaction[];
}
