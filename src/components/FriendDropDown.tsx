import { IUser } from "../interfaces/IUser";
import { getUserById } from "../utils/getUserById";
import { handleDeselectFriend } from "../utils/handleDeselectFriend";

export function FriendDropDown(props: {
  allFriends: IUser[];
  selectedFriends: IUser[];
  setSelectedFriends: React.Dispatch<React.SetStateAction<IUser[]>>;
}): JSX.Element {
  return (
    <div>
      <label htmlFor="friends">Split this with:</label>
      <select
        className="ml-2"
        name="friends"
        value={""}
        onChange={(e) => {
          props.setSelectedFriends((prev) => [
            ...prev,
            getUserById(props.allFriends, parseInt(e.target.value)),
          ]);
        }}
      >
        <option value="" disabled>
          Select friend(s)
        </option>
        {props.allFriends
          .filter(
            (item) =>
              !props.selectedFriends.some((person) => item.id === person.id)
          )
          .map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
      </select>
      <br />
      {props.selectedFriends.map((friend) => (
        <button
          className="btn btn-info btn-sm mr-1"
          key={friend.id}
          onClick={() =>
            props.setSelectedFriends(
              handleDeselectFriend(friend.id, props.selectedFriends)
            )
          }
        >
          {friend.name}
        </button>
      ))}
    </div>
  );
}
