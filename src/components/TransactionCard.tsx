import { ITransaction } from "../interfaces/ITransation";

export function TransactionCard(props: {
  transaction: ITransaction;
}): JSX.Element {
  if (props.transaction.amount === undefined) {
    return <h2>An unknown error has occured.</h2>;
  } else {
    return (
      <div className="container border border-primary m-2 p-2">
        <h6>{props.transaction.transaction_date}</h6>
        <h4>{props.transaction.description}</h4>
        {props.transaction.amount < 0 && (
          <h4>
            You lent <br />£{props.transaction.balance}
          </h4>
        )}
        {props.transaction.amount > 0 && (
          <h4>
            You owe <br />£{props.transaction.balance}
          </h4>
        )}
      </div>
    );
  }
}
