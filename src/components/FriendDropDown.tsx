import { IUser } from "../interfaces/IUser";
import { handleSelectFriend } from "../utils/handleSelectFriend";
import { handleUnselectFriend } from "../utils/handleUnselectFriend";

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
        defaultValue={""}
        // onSelect={(e) => {
        //   setprops.selectedFriends(
        //     handleSelectFriend(
        //       parseInt(e.target.value),
        //       props.selectedFriends,
        //       props.allFriends
        //     )
        //   );
        //   console.log(e.target.value);
        // }}
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
            <option
              key={item.id}
              value={item.id}
              onClick={() => {
                props.setSelectedFriends(
                  handleSelectFriend(
                    item.id,
                    props.selectedFriends,
                    props.allFriends
                  )
                );
                console.log("selected", item.id);
              }}
            >
              {item.name}
            </option>
          ))}
      </select>
      {props.selectedFriends.length === 0 ? (
        <p>Please select friend(s) to split this expense with.</p>
      ) : (
        <>
          {props.selectedFriends.map((friend) => (
            <button
              key={friend.id}
              onClick={() =>
                handleUnselectFriend(friend.id, props.selectedFriends)
              }
            >
              {friend.name}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
