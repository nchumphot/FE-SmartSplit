import { IFriendSummary } from "../interfaces/IFriendSummary";

export function FriendCard(props: { friend: IFriendSummary }): JSX.Element {
  if (props.friend.balance === undefined) {
    return (
      <>
        <h4>Calculating...</h4>
      </>
    );
  } else {
    return (
      <>
        <h4>{props.friend.name}</h4>
        {props.friend.balance < 0 && (
          <p>You are owed £{(props.friend.balance * -1).toFixed(2)}</p>
        )}
        {props.friend.balance > 0 && (
          <p>You owe £{props.friend.balance.toFixed(2)}</p>
        )}
        {props.friend.balance === 0 && <p>You are settled up</p>}
      </>
    );
  }
}
