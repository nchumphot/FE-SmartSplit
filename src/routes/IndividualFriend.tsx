import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { TransactionCard } from "../components/TransactionCard";
import { IFriend } from "../interfaces/IFriend";
import { ITransaction } from "../interfaces/ITransation";
import { IUser } from "../interfaces/IUser";
import { baseUrl } from "../utils/baseUrl";
import { fetchData } from "../utils/fetchData";

export function IndividualFriend(props: {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}): JSX.Element {
  const fakeId = useParams().id;
  const [friendInfo, setFriendInfo] = useState<IFriend | undefined>();
  const [allTransactions, setAllTransations] = useState<ITransaction[]>([]);
  useEffect(() => {
    if (fakeId !== undefined) {
      const realId = (parseInt(fakeId) - 13) / 199;
      fetchData(
        baseUrl + `/friends/${props.user?.id}/${realId}`,
        setFriendInfo
      );
    }
  }, [fakeId, props.user?.id]);
  useEffect(() => {
    if (friendInfo !== undefined) {
      const transactions = [];
      for (const item of friendInfo.moneyBorrowed) {
        const newItem = { ...item, amount: parseFloat(item.balance) };
        transactions.push(newItem);
      }
      for (const item of friendInfo.moneyLent) {
        const newItem = { ...item, amount: -parseFloat(item.balance) };
        transactions.push(newItem);
      }
      setAllTransations(transactions);
    }
  }, [friendInfo]);
  console.log(friendInfo);
  console.log(allTransactions);

  if (props.user === undefined) {
    return <h2>Please log in.</h2>;
  } else if (friendInfo === undefined) {
    return <h2>Loading friend...</h2>;
  } else {
    return (
      <>
        <PageHeader user={props.user} setUser={props.setUser} />
        <h2>Your SmartSplit summary with {friendInfo.info[0].name}!</h2>
        {allTransactions.map((item) => (
          <TransactionCard transaction={item} />
        ))}
      </>
    );
  }
}
