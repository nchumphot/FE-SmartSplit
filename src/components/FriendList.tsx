import { useState } from "react";
import { IFriendSummary } from "../interfaces/IFriendSummary";
import { ISummary } from "../interfaces/ISummary";
import { friendFilter } from "../utils/friendFilter";
import { FriendCard } from "./FriendCard";

export function FriendList(props: {
  summary: ISummary | undefined;
}): JSX.Element {
  const filterOptions = [
    "All",
    "Friends with outstanding balance",
    "Friends you owe",
    "Friends who owe you",
  ];
  const [selectedOption, setSelectionOption] = useState<string>("All");
  if (props.summary === undefined) {
    return <h3>Loading your friend list...</h3>;
  } else {
    // Tallying up balance for each friend
    let friendSummary: IFriendSummary[] = props.summary.friends;
    for (const friend of friendSummary) {
      friend.moneyBorrowed = 0;
      friend.moneyLent = 0;
      for (const item of props.summary.moneyBorrowed) {
        if (friend.id === item.lender_id) {
          friend.moneyBorrowed += parseFloat(item.balance);
        }
      }
      for (const item of props.summary.moneyLent) {
        if (friend.id === item.borrower_id) {
          friend.moneyLent += parseFloat(item.balance);
        }
      }
      // Final balance (+) if you owe, (-) if you are owed.
      friend.balance = friend.moneyBorrowed - friend.moneyLent;
    }
    return (
      <div>
        <h3>Friends</h3>
        <button className="btn btn-success">Add friends</button>
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
            <FriendCard friend={friend} />
          ))}
      </div>
    );
  }
}
