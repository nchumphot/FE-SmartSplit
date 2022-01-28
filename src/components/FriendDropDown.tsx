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
      {/* {props.selectedFriends.length === 0 ? (
        <p>Please select friend(s) to split this expense with.</p>
      ) : (
        <> */}
      {props.selectedFriends.map((friend) => (
        <button
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
      {/* </>
      )} */}
    </div>
  );
}
