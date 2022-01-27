import { useEffect, useState } from "react";
import { IFriendSummary } from "../interfaces/IFriendSummary";
import { ISummary } from "../interfaces/ISummary";
import { IUser } from "../interfaces/IUser";
import { calculateBalanceForAll } from "../utils/calculateBalanceforAll";
import { friendFilter } from "../utils/friendFilter";
import { getNonFriendList } from "../utils/getNonFriendList";
import { AddFriendModal } from "./AddFriendModal";
import { FriendCard } from "./FriendCard";

export function FriendList(props: {
  summary: ISummary | undefined;
  setSummary: React.Dispatch<React.SetStateAction<ISummary | undefined>>;
  user: IUser;
}): JSX.Element {
  const filterOptions = [
    "All",
    "People with outstanding balance",
    "People you owe",
    "People who owe you",
  ];
  const [selectedOption, setSelectionOption] = useState<string>("All");
  const [friendSummary, setFriendSummary] = useState<IFriendSummary[]>([]);
  const [nonFriendSummary, setNonFriendSummary] = useState<IFriendSummary[]>(
    []
  );
  useEffect(() => {
    if (props.summary !== undefined) {
      // Calculate balance for all friends
      const friendSummary = calculateBalanceForAll(
        props.user.id,
        props.summary?.friends,
        props.summary
      );
      setFriendSummary(friendSummary);
      // Calculate balance for all non-friends
      const nonFriends = getNonFriendList(
        props.user.id,
        props.summary.friends,
        props.summary.moneyBorrowed,
        props.summary.moneyLent
      );
      const nonFriendSummary = calculateBalanceForAll(
        props.user.id,
        nonFriends,
        props.summary
      );
      setNonFriendSummary(nonFriendSummary);
    }
  }, [props.summary, props.user.id]);

  console.log(friendSummary);
  console.log(nonFriendSummary);

  if (props.summary === undefined) {
    return <h3>Loading your friend list...</h3>;
  } else {
    return (
      <div>
        <h3>Friends</h3>
        <button
          type="button"
          className="btn btn-success"
          data-toggle="modal"
          data-target="#addFriendModal"
        >
          Add friends
        </button>
        <AddFriendModal user={props.user} />
        {/* Filter dropdown */}
        <label htmlFor="filter-dropdown">Filter:</label>
        <select
          name="filter-dropdown"
          value={selectedOption}
          onChange={(e) => setSelectionOption(e.target.value)}
        >
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {/* List of friends */}
        {friendSummary
          .filter((friend) => friendFilter(selectedOption, friend))
          .map((friend) => (
            <FriendCard
              key={friend.id}
              friend={friend}
              isFriend={true}
              user={props.user}
              setSummary={props.setSummary}
            />
          ))}
        {nonFriendSummary.filter((friend) =>
          friendFilter(selectedOption, friend)
        ).length !== 0 && (
          <>
            <h3>Not in your friend list</h3>
            {nonFriendSummary
              .filter((friend) => friendFilter(selectedOption, friend))
              .map((friend) => (
                <FriendCard
                  friend={friend}
                  isFriend={false}
                  user={props.user}
                  setSummary={props.setSummary}
                />
              ))}
          </>
        )}
      </div>
    );
  }
}
