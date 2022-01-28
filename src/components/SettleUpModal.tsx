import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IExpenseForm } from "../interfaces/IExpenseForm";
import { ITransactionAdd } from "../interfaces/ITransactionAdd";
import { IUser } from "../interfaces/IUser";
import { handleAddExpense } from "../utils/handleAddExpense";

export function SettleUpModal(props: {
  user: IUser;
  friend: IUser;
  balance: number;
}): JSX.Element {
  const today = new Date().toISOString().slice(0, 10);
  const positiveBalance = props.balance < 0 ? -props.balance : props.balance;
  const paidbyId = props.balance < 0 ? props.friend.id : props.user.id;
  const receiverId = props.balance > 0 ? props.friend.id : props.user.id;
  const initialDetail = {
    description: "isSettleUp=true",
    amount: positiveBalance,
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
                      amount: parseFloat(e.target.value),
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
              <Link to={`/friends/${props.friend.id * 199 + 13}`}>
                <button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                  onClick={() => {
                    handleAddExpense(props.user.id, details, transactions);
                    setDetails(initialDetail);
                  }}
                >
                  Settle up
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
