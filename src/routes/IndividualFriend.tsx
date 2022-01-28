import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { TransactionCard } from "../components/TransactionCard";
import { IFriend } from "../interfaces/IFriend";
import { IFriendSummary } from "../interfaces/IFriendSummary";
import { ISummary } from "../interfaces/ISummary";
import { ITransaction } from "../interfaces/ITransation";
import { IUser } from "../interfaces/IUser";
import { baseUrl } from "../utils/baseUrl";
import { calculateBalanceForAll } from "../utils/calculateBalanceforAll";
import { fetchData } from "../utils/fetchData";

export function IndividualFriend(props: {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  summary: ISummary | undefined;
}): JSX.Element {
  const fakeId = useParams().id;
  const [friendInfo, setFriendInfo] = useState<IFriend | undefined>();
  const [allTransactions, setAllTransations] = useState<ITransaction[]>([]);
  const [thisFriendSummary, setThisFriendSummary] = useState<IFriendSummary[]>(
    []
  );
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
  useEffect(() => {
    if (
      props.user !== undefined &&
      friendInfo !== undefined &&
      props.summary !== undefined
    ) {
      const friendSummary = calculateBalanceForAll(
        props.user.id,
        friendInfo.info,
        props.summary
      );
      console.log(friendSummary);
      setThisFriendSummary(friendSummary);
    }
  }, [props.summary, friendInfo, props.user]);
  console.log(thisFriendSummary);

  if (props.user === undefined) {
    return <h2>Please log in.</h2>;
  } else if (friendInfo === undefined) {
    return <h2>Loading friend...</h2>;
  } else {
    return (
      <>
        <PageHeader user={props.user} setUser={props.setUser} />
        {allTransactions.length === 0 ? (
          <h2>You have no expenses with {friendInfo.info[0].name}.</h2>
        ) : (
          // if there is at least 1 transaction
          <>
            {thisFriendSummary[0].balance !== undefined &&
              thisFriendSummary[0].balance > 0 && (
                <h3>
                  {`You owe ${
                    friendInfo.info[0].name
                  }  £${thisFriendSummary[0].balance.toFixed(2)}`}
                </h3>
              )}
            {thisFriendSummary[0].balance !== undefined &&
              thisFriendSummary[0].balance < 0 && (
                <h3>
                  {`${
                    friendInfo.info[0].name
                  } owes you £${(-thisFriendSummary[0].balance).toFixed(2)}`}
                </h3>
              )}
            {thisFriendSummary[0].balance !== 0 && (
              <button className="btn btn-warning">Settle up</button>
            )}
            <h2>Your SmartSplit summary with {friendInfo.info[0].name}!</h2>
            {allTransactions.map((item) => (
              <TransactionCard transaction={item} />
            ))}
          </>
        )}
      </>
    );
  }
}
