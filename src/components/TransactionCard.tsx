import { Link } from "react-router-dom";
import { ITransaction } from "../interfaces/ITransation";
import { dateTimeFormatter } from "../utils/dateTimeFormatter";

export function TransactionCard(props: {
  transaction: ITransaction;
}): JSX.Element {
  if (props.transaction.amount === undefined) {
    return <h2>An unknown error has occured.</h2>;
  } else {
    return (
      <div className="container-lg border border-primary m-2 p-2">
        <h6>{dateTimeFormatter(props.transaction.transaction_date)}</h6>
        <Link to={`/expenses/${props.transaction.expense_id}`}>
          <h4>{props.transaction.description}</h4>
        </Link>

        {props.transaction.amount < 0 && (
          <h4 className="text-success">
            You lent <br />£{props.transaction.balance}
          </h4>
        )}
        {props.transaction.amount > 0 && (
          <h4 className="text-danger">
            You owe <br />£{props.transaction.balance}
          </h4>
        )}
      </div>
    );
  }
}
