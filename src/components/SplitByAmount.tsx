import { useEffect, useState } from "react";
import { IExpenseForm } from "../interfaces/IExpenseForm";
import { ITransactionAdd } from "../interfaces/ITransactionAdd";
import { ITransactionAddString } from "../interfaces/ITransactionAddString";
import { IUser } from "../interfaces/IUser";

export function SplitByAmount(props: {
  details: IExpenseForm;
  user: IUser;
  selectedFriends: IUser[];
  setTransactions: React.Dispatch<React.SetStateAction<ITransactionAdd[]>>;
}): JSX.Element {
  const [newTransactions, setNewTransactions] = useState<ITransactionAdd[]>([]);
  const [amount, setAmount] = useState<ITransactionAddString[]>([]);
  const [sum, setSum] = useState<number>(0);
  const { setTransactions } = props;
  useEffect(() => {
    if (props.user !== undefined) {
      const initialAmount: ITransactionAddString[] = [];
      const lenderId = props.details.lenderId;
      const myTrans = {
        lenderId: lenderId,
        borrowerId: props.user?.id,
        balance: "0",
      };
      initialAmount.push(myTrans);
      for (const friend of props.selectedFriends) {
        const trans = {
          lenderId: lenderId,
          borrowerId: friend.id,
          balance: "0",
        };
        initialAmount.push(trans);
      }
      setAmount(initialAmount);
    }
  }, [props.user, props.details.lenderId, props.selectedFriends]);
  useEffect(() => {
    const newTransactions: ITransactionAdd[] = [];
    for (const amt of amount) {
      newTransactions.push({ ...amt, balance: parseFloat(amt.balance) });
    }
    setNewTransactions(newTransactions);
    setTransactions(newTransactions);
  }, [amount, setTransactions]);
  useEffect(() => {
    let totalSoFar = 0;
    for (const trans of newTransactions) {
      totalSoFar += trans.balance;
    }
    setSum(totalSoFar);
  }, [newTransactions]);
  if (props.user !== undefined && newTransactions.length !== 0) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">You</div>
          <div className="col">
            <input
              type="text"
              value={
                amount.filter((a) => a.borrowerId === props.user.id)[0].balance
              }
              onChange={(e) => {
                const newAmount = amount.filter(
                  (a) => a.borrowerId !== props.user.id
                );
                newAmount.push({
                  lenderId: props.details.lenderId,
                  borrowerId: props.user.id,
                  balance: e.target.value,
                });
                setAmount(newAmount);
              }}
            ></input>
          </div>
        </div>
        {props.selectedFriends.map((friend) => {
          return (
            <div key={friend.id} className="row">
              <div className="col-3">{friend.name}</div>
              <div className="col">
                <input
                  type="text"
                  value={
                    amount.filter((a) => a.borrowerId === friend.id)[0].balance
                  }
                  onChange={(e) => {
                    const newAmount = amount.filter(
                      (a) => a.borrowerId !== friend.id
                    );
                    newAmount.push({
                      lenderId: props.details.lenderId,
                      borrowerId: friend.id,
                      balance: e.target.value,
                    });
                    setAmount(newAmount);
                  }}
                ></input>
              </div>
            </div>
          );
        })}
        <div
          className={`text-${
            sum === parseFloat(props.details.amount)
              ? "success"
              : sum > parseFloat(props.details.amount)
              ? "danger"
              : "dark"
          }`}
        >
          <p>
            £{sum.toFixed(2)} of £{parseFloat(props.details.amount).toFixed(2)}
          </p>
          <p>£{(parseFloat(props.details.amount) - sum).toFixed(2)} left</p>
        </div>
      </div>
    );
  } else {
    return <h2>Please log in to add an expense.</h2>;
  }
}
