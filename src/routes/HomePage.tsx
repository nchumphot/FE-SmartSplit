import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FriendList } from "../components/FriendList";
import LogIn from "../components/LogIn";
import { PageHeader } from "../components/PageHeader";
import { SmartSplitSummary } from "../components/SmartSplitSummary";
import { IFriendSummary } from "../interfaces/IFriendSummary";
import { ISummary } from "../interfaces/ISummary";
import { IUser } from "../interfaces/IUser";
import { calculateBalanceForAll } from "../utils/calculateBalanceforAll";
import { getNonFriendList } from "../utils/getNonFriendList";

export function HomePage(props: {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  allUsers: IUser[];
  setAllUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  summary: ISummary | undefined;
  setSummary: React.Dispatch<React.SetStateAction<ISummary | undefined>>;
}): JSX.Element {
  const [friendSummary, setFriendSummary] = useState<IFriendSummary[]>([]);
  const [nonFriendSummary, setNonFriendSummary] = useState<IFriendSummary[]>(
    []
  );
  const [netOwing, setNetOwing] = useState<number>(0);
  const [netIsOwed, setNetIsOwed] = useState<number>(0);
  useEffect(() => {
    if (props.summary !== undefined && props.user !== undefined) {
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
  }, [props.summary, props.user]);
  useEffect(() => {
    let netOwing = 0;
    let netIsOwed = 0;
    for (const friend of friendSummary) {
      if (friend.balance !== undefined && friend.balance > 0) {
        netOwing += friend.balance;
      } else if (friend.balance !== undefined && friend.balance < 0) {
        netIsOwed += friend.balance;
      }
    }
    for (const friend of nonFriendSummary) {
      if (friend.balance !== undefined && friend.balance > 0) {
        netOwing += friend.balance;
      } else if (friend.balance !== undefined && friend.balance < 0) {
        netIsOwed += friend.balance;
      }
    }
    setNetOwing(netOwing);
    setNetIsOwed(netIsOwed);
  }, [friendSummary, nonFriendSummary]);
  if (props.user === undefined) {
    // If no one is logged in
    return (
      <>
        <PageHeader user={props.user} setUser={props.setUser} />
        <h2>Welcome to SmartSplit!</h2>
        <LogIn
          allUsers={props.allUsers}
          setAllUsers={props.setAllUsers}
          setUser={props.setUser}
        />
      </>
    );
  } else {
    // If a user is logged in
    console.log(friendSummary);
    console.log(nonFriendSummary);
    return (
      <>
        <PageHeader user={props.user} setUser={props.setUser} />
        <h2>Welcome back, {props.user.name}!</h2>
        <Link to="/expenses/add">
          <button type="button" className="btn btn-success">
            Add expense
          </button>
        </Link>
        <SmartSplitSummary netOwing={netOwing} netIsOwed={netIsOwed} />
        <FriendList
          summary={props.summary}
          setSummary={props.setSummary}
          user={props.user}
          friendSummary={friendSummary}
          nonFriendSummary={nonFriendSummary}
        />
      </>
    );
  }
}
