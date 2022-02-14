import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IExpenseForm } from "../interfaces/IExpenseForm";
import { IFriend } from "../interfaces/IFriend";
import { IFriendSummary } from "../interfaces/IFriendSummary";
import { ISummary } from "../interfaces/ISummary";
import { ITransactionAdd } from "../interfaces/ITransactionAdd";
import { ITransaction } from "../interfaces/ITransation";
import { IUser } from "../interfaces/IUser";
import { calculateFriendSummary } from "../utils/calculateFriendSummary";
import { convertAmountToNumber } from "../utils/convertAmountToNumber";
import { fetchFriendData } from "../utils/fetchFriendData";
import { handleAddExpense } from "../utils/handleAddExpense";

export function SettleUpModal(props: {
  user: IUser;
  friend: IUser;
  balance: number;
  fakeId: string | undefined;
  summary: ISummary | undefined;
  friendInfo: IFriend | undefined;
  setFriendInfo: React.Dispatch<React.SetStateAction<IFriend | undefined>>;
  setAllTransations: React.Dispatch<React.SetStateAction<ITransaction[]>>;
  setThisFriendSummary: React.Dispatch<React.SetStateAction<IFriendSummary[]>>;
}): JSX.Element {
  const today = new Date().toISOString().slice(0, 10);
  const positiveBalance = props.balance < 0 ? -props.balance : props.balance;
  const paidbyId = props.balance < 0 ? props.friend.id : props.user.id;
  const receiverId = props.balance > 0 ? props.friend.id : props.user.id;
  const initialDetail = {
    description: "isSettleUp=true",
    amount: positiveBalance.toString(),
    lenderId: paidbyId,
    option: "N/A",
    date: today,
    notes: "isSettleUp=true",
  };
  const [details, setDetails] = useState<IExpenseForm>(initialDetail);
  const [transactions, setTransactions] = useState<ITransactionAdd[]>([]);
  useEffect(() => {
    const transaction = [
      {
        lenderId: paidbyId,
        borrowerId: receiverId,
        balance: positiveBalance,
      },
    ];
    setTransactions(transaction);
  }, [paidbyId, receiverId, positiveBalance]);

  return (
    <div
      className="modal fade"
      id="settleUpModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Settle up with {props.friend.name}</h5>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <>£</>
                <input
                  className="form-control"
                  value={details.amount}
                  name="amount"
                  onChange={(e) =>
                    setDetails({
                      ...details,
                      amount: e.target.value,
                    })
                  }
                ></input>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={() => setDetails(initialDetail)}
            >
              Not now
            </button>
            {props.user !== undefined && (
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={() => {
                  handleAddExpense(props.user.id, details, transactions).then(
                    () => {
                      console.log("settling up");
                      fetchFriendData(
                        props.fakeId,
                        props.user?.id,
                        props.setFriendInfo
                      );
                      convertAmountToNumber(
                        props.friendInfo,
                        props.setAllTransations
                      );
                      calculateFriendSummary(
                        props.user,
                        props.friendInfo,
                        props.summary,
                        props.setThisFriendSummary
                      );
                      setDetails(initialDetail);
                    }
                  );
                }}
              >
                Settle up
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
