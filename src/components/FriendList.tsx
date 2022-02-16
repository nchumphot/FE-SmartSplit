import { useState } from "react";
import { IFriendSummary } from "../interfaces/IFriendSummary";
import { ISummary } from "../interfaces/ISummary";
import { IUser } from "../interfaces/IUser";
import { friendFilter } from "../utils/friendFilter";
import { AddFriendModal } from "./AddFriendModal";
import { FriendCard } from "./FriendCard";

export function FriendList(props: {
  summary: ISummary | undefined;
  setSummary: React.Dispatch<React.SetStateAction<ISummary | undefined>>;
  user: IUser;
  friendSummary: IFriendSummary[];
  nonFriendSummary: IFriendSummary[];
}): JSX.Element {
  const filterOptions = [
    "All",
    "People with outstanding balance",
    "People you owe",
    "People who owe you",
  ];
  const [selectedOption, setSelectionOption] = useState<string>("All");
  if (props.summary === undefined) {
    return <h3>Loading your friend list...</h3>;
  } else {
    return (
      <div>
        <h3>Friends</h3>
        <div className="container-lg">
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-success"
                data-toggle="modal"
                data-target="#addFriendModal"
              >
                Add friends
              </button>
              <AddFriendModal user={props.user} />
            </div>
            <div className="col-3 my-auto">
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
            </div>
          </div>
        </div>
        {/* List of friends */}
        {props.friendSummary
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
        {props.nonFriendSummary.filter((friend) =>
          friendFilter(selectedOption, friend)
        ).length !== 0 && (
          <>
            <h3>Not in your friend list</h3>
            {props.nonFriendSummary
              .filter((friend) => friendFilter(selectedOption, friend))
              .map((friend) => (
                <FriendCard
                  key={friend.id}
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
