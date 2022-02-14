import { IUser } from "../interfaces/IUser";
import { ISummary } from "../interfaces/ISummary";
import { IFriend } from "../interfaces/IFriend";
import { IGetUser } from "../interfaces/IGetUser";
import { IExpense } from "../interfaces/IExpense";
import { ITransactionShort } from "../interfaces/ITransactionShort";
import { IComment } from "../interfaces/IComment";

export function fetchData(
  url: string,
  setState:
    | React.Dispatch<React.SetStateAction<IUser[]>>
    | React.Dispatch<React.SetStateAction<ISummary | undefined>>
    | React.Dispatch<React.SetStateAction<IFriend | undefined>>
    | React.Dispatch<React.SetStateAction<IGetUser | undefined>>
    | React.Dispatch<
        React.SetStateAction<
          | {
              expense: IExpense[];
              transactions: ITransactionShort[];
            }
          | undefined
        >
      >
    | React.Dispatch<React.SetStateAction<IComment[] | undefined>>
): void {
  fetch(url)
    .then((res) => res.json())
    .then((jsonBody) => setState(jsonBody.data));
}
