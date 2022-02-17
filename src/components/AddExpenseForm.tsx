import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IExpenseForm } from "../interfaces/IExpenseForm";
import { ITransactionAdd } from "../interfaces/ITransactionAdd";
import { IUser } from "../interfaces/IUser";
import { handleAddExpense } from "../utils/handleAddExpense";
import { SplitByAmount } from "./SplitByAmount";

export default function AddExpenseForm(props: {
  user: IUser | undefined;
  selectedFriends: IUser[];
  details: IExpenseForm;
  setDetails: React.Dispatch<React.SetStateAction<IExpenseForm>>;
}): JSX.Element {
  const [transactions, setTransactions] = useState<ITransactionAdd[]>([]);
  const options = ["Split equally", "Split by amount", "Split by percentage"];
  const [splitOption, setSplitOption] = useState<string>(options[0]);
  useEffect(() => {
    if (props.user !== undefined) {
      if (splitOption === "Split equally") {
        const numberOfPeople = props.selectedFriends.length + 1;
        const costPerPerson = parseFloat(props.details.amount) / numberOfPeople;
        const transactions: ITransactionAdd[] = [];
        // create a transaction for the user
        transactions.push({
          lenderId: props.details.lenderId,
          borrowerId: props.user.id,
          balance: costPerPerson,
        });
        // create a transaction for each user
        for (const friend of props.selectedFriends) {
          transactions.push({
            lenderId: props.details.lenderId,
            borrowerId: friend.id,
            balance: costPerPerson,
          });
        }
        setTransactions(transactions);
      } else {
        const transactions: ITransactionAdd[] = [];
        // create a transaction for the user
        transactions.push({
          lenderId: props.details.lenderId,
          borrowerId: props.user.id,
          balance: 0,
        });
        // create a transaction for each user
        for (const friend of props.selectedFriends) {
          transactions.push({
            lenderId: props.details.lenderId,
            borrowerId: friend.id,
            balance: 0,
          });
        }
        setTransactions(transactions);
      }
    }
  }, [props.details, props.user, props.selectedFriends, splitOption]);
  console.log(splitOption);
  console.log(transactions);
  if (props.user !== undefined) {
    return (
      <form className="p-12">
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            className="form-control"
            value={props.details.description}
            name="description"
            onChange={(e) =>
              props.setDetails({
                ...props.details,
                description: e.target.value,
              })
            }
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <>£</>
          <input
            className="form-control"
            value={props.details.amount}
            name="amount"
            onChange={(e) =>
              props.setDetails({
                ...props.details,
                amount: e.target.value,
              })
            }
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="lender">Paid by</label>
          <select
            name="lender"
            onChange={(e) =>
              props.setDetails({
                ...props.details,
                lenderId: parseInt(e.target.value),
              })
            }
          >
            <option key={props.user.id} value={props.user.id}>
              You
            </option>
            {props.selectedFriends.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="split-option">Split option:</label>
          <select
            className="form-control"
            name="split-option"
            value={splitOption}
            onChange={(e) => {
              setSplitOption(e.target.value);
            }}
          >
            {options.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div id="split-option">
          {/* Split equally */}
          {splitOption === "Split equally" && transactions.length !== 0 && (
            <p className="text-danger">
              Each person owes £{transactions[0].balance}
            </p>
          )}
          {/* Split by amount */}
          {splitOption === "Split by amount" && transactions.length !== 0 && (
            <SplitByAmount
              details={props.details}
              user={props.user}
              selectedFriends={props.selectedFriends}
              setTransactions={setTransactions}
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            className="form-control"
            name="date"
            type="date"
            value={props.details.date}
            onChange={(e) =>
              props.setDetails({
                ...props.details,
                date: e.target.value,
              })
            }
          ></input>
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Add notes (optional)"
            name="notes"
            rows={4}
            value={props.details.notes}
            onChange={(e) =>
              props.setDetails({
                ...props.details,
                notes: e.target.value,
              })
            }
          ></textarea>
        </div>
        <Link to="/">
          <button type="button" className="btn btn-danger">
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() =>
              handleAddExpense(props.user?.id, props.details, transactions)
            }
          >
            Add expense
          </button>
        </Link>
      </form>
    );
  } else {
    return <h2>Please log in to add an expense.</h2>;
  }
}
