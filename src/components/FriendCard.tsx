import { Link } from "react-router-dom";
import { IFriendSummary } from "../interfaces/IFriendSummary";
import { ISummary } from "../interfaces/ISummary";
import { IUser } from "../interfaces/IUser";
import { handleAddStranger } from "../utils/handleAddStranger";

export function FriendCard(props: {
  friend: IFriendSummary;
  isFriend: boolean;
  user: IUser;
  setSummary: React.Dispatch<React.SetStateAction<ISummary | undefined>>;
}): JSX.Element {
  if (props.friend.balance === undefined) {
    return (
      <>
        <h4>Calculating...</h4>
      </>
    );
  } else {
    return (
      <div
        className={`container m-2 p-2 border ${
          props.isFriend ? "border border-success" : "border border-warning"
        }`}
      >
        <div className="row">
          <div className="col-10">
            <Link to={`/friends/${props.friend.id * 199 + 13}`}>
              <h4>{props.friend.name}</h4>
            </Link>

            {props.isFriend === false && (
              <button
                className="btn btn-success"
                onClick={() =>
                  handleAddStranger(
                    props.user.id,
                    props.friend.id,
                    props.setSummary
                  )
                }
              >
                Add friend
              </button>
            )}
          </div>
          <div className="col">
            {props.friend.balance < 0 && (
              <p>
                You are owed <br />£{(props.friend.balance * -1).toFixed(2)}
              </p>
            )}
            {props.friend.balance > 0 && (
              <p>
                You owe <br />£{props.friend.balance.toFixed(2)}
              </p>
            )}
            {props.friend.balance === 0 && (
              <p>
                You are <br />
                settled up
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
