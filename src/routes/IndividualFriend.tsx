import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { SettleUpModal } from "../components/SettleUpModal";
import { TransactionCard } from "../components/TransactionCard";
import { IFriend } from "../interfaces/IFriend";
import { IFriendSummary } from "../interfaces/IFriendSummary";
import { ISummary } from "../interfaces/ISummary";
import { ITransaction } from "../interfaces/ITransation";
import { IUser } from "../interfaces/IUser";
import { calculateFriendSummary } from "../utils/calculateFriendSummary";
import { convertAmountToNumber } from "../utils/convertAmountToNumber";
import { fetchFriendData } from "../utils/fetchFriendData";

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
    fetchFriendData(fakeId, props.user?.id, setFriendInfo);
  }, [fakeId, props.user?.id]);
  useEffect(() => {
    convertAmountToNumber(friendInfo, setAllTransations);
  }, [friendInfo]);
  useEffect(() => {
    calculateFriendSummary(
      props.user,
      friendInfo,
      props.summary,
      setThisFriendSummary
    );
  }, [props.summary, friendInfo, props.user]);

  if (props.user === undefined) {
    return <h2>Please log in.</h2>;
  } else if (friendInfo === undefined) {
    return <h2>Loading friend...</h2>;
  } else {
    return (
      <>
        <PageHeader user={props.user} setUser={props.setUser} />
        {allTransactions.length === 0 ? (
          // if there are no transactions between these people
          <h2>You have no expenses with {friendInfo.info[0].name}.</h2>
        ) : thisFriendSummary[0].balance !== undefined &&
          thisFriendSummary[0].balance === 0 ? (
          // if the thisFriendSummary[0].balance is zero
          <h2>You are all settled up with {friendInfo.info[0].name}.</h2>
        ) : (
          // if the balance is non-zero
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
            {thisFriendSummary[0].balance !== undefined &&
              thisFriendSummary[0].balance !== 0 && (
                <>
                  <button
                    type="button"
                    className="btn btn-warning"
                    data-toggle="modal"
                    data-target="#settleUpModal"
                  >
                    Settle up
                  </button>
                  <SettleUpModal
                    {...{
                      friendInfo,
                      setFriendInfo,
                      setAllTransations,
                      setThisFriendSummary,
                    }}
                    user={props.user}
                    friend={friendInfo.info[0]}
                    balance={thisFriendSummary[0].balance}
                    fakeId={fakeId}
                    summary={props.summary}
                  />
                </>
              )}
            <h2>Your SmartSplit summary with {friendInfo.info[0].name}!</h2>
            {allTransactions
              .filter((item) => item.description !== "isSettleUp=true")
              .map((item) => (
                <TransactionCard transaction={item} />
              ))}
          </>
        )}
      </>
    );
  }
}
