import { ITransaction } from "./ITransation";
import { IUser } from "./IUser";

export interface IFriend {
  info: IUser[];
  moneyBorrowed: ITransaction[];
  moneyLent: ITransaction[];
}
