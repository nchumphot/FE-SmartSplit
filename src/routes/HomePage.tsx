import { Link } from "react-router-dom";
import { FriendList } from "../components/FriendList";
import LogIn from "../components/LogIn";
import { PageHeader } from "../components/PageHeader";
import { SmartSplitSummary } from "../components/SmartSplitSummary";
import { ISummary } from "../interfaces/ISummary";
import { IUser } from "../interfaces/IUser";

export function HomePage(props: {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  allUsers: IUser[];
  setAllUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  summary: ISummary | undefined;
  setSummary: React.Dispatch<React.SetStateAction<ISummary | undefined>>;
}): JSX.Element {
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
    console.log(props.summary);
    return (
      <>
        <PageHeader user={props.user} setUser={props.setUser} />
        <h2>Welcome back, {props.user.name}!</h2>
        <Link to="/expenses/add">
          <button type="button" className="btn btn-success">
            Add expense
          </button>
        </Link>
        <SmartSplitSummary summary={props.summary} user={props.user} />
        <FriendList
          summary={props.summary}
          setSummary={props.setSummary}
          user={props.user}
        />
      </>
    );
  }
}
