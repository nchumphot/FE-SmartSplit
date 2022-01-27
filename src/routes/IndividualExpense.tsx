import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { IExpense } from "../interfaces/IExpense";
import { ITransactionShort } from "../interfaces/ITransactionShort";
import { IUser } from "../interfaces/IUser";
import { baseUrl } from "../utils/baseUrl";
import { dateTimeFormatter } from "../utils/dateTimeFormatter";
import { fetchData } from "../utils/fetchData";

export function IndividualExpense(props: {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}): JSX.Element {
  const [expenseDetails, setExpenseDetails] = useState<
    { expense: IExpense[]; transactions: ITransactionShort[] } | undefined
  >();
  // const [comments, setComments] = useState();
  const { id } = useParams();
  useEffect(() => {
    fetchData(baseUrl + `/expenses/${id}`, setExpenseDetails);
  }, [id]);
  console.log(expenseDetails);
  if (expenseDetails === undefined) {
    return (
      <div>
        <PageHeader user={props.user} setUser={props.setUser} />
        <h2>Loading expense details...</h2>
      </div>
    );
  } else {
    if (props.user !== undefined) {
      const description = expenseDetails.expense[0].description;
      const totalBalance = expenseDetails.expense[0].total_balance;
      const creatorName = expenseDetails.expense[0].user_name;
      const creationDate = expenseDetails.expense[0].creation_date;
      const lenderId = expenseDetails.transactions[0].lender_id;
      const lenderName = expenseDetails.transactions[0].lender_name;
      const notes = expenseDetails.expense[0].notes;
      const youOwe =
        expenseDetails.transactions.some(
          (item) => item.borrower_id === props.user?.id
        ) && lenderId !== props.user?.id;
      const youOweTransaction = expenseDetails.transactions.filter(
        (item) => item.borrower_id === props.user?.id
      )[0];
      const otherTransactions = expenseDetails.transactions.filter(
        (item) => item.borrower_id !== props.user?.id
      );
      return (
        <div>
          <PageHeader user={props.user} setUser={props.setUser} />
          <h4>{description}</h4>
          <h2>{`£${totalBalance}`}</h2>
          <p>
            {`Added by ${creatorName} on
          ${dateTimeFormatter(creationDate)}`}
          </p>
          {notes && <p>{`Notes: ${notes}`}</p>}
          <h5>{`${lenderName} paid £${totalBalance}`}</h5>
          <ul>
            {youOwe && <li>{`You owe £${youOweTransaction.balance}`}</li>}
            {otherTransactions.map((item) => (
              <li>{`${item.borrower_name} owe £${item.balance}`}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <PageHeader user={props.user} setUser={props.setUser} />
          <h2>You don't have the permission to view this expense.</h2>
        </div>
      );
    }
  }
}
