import { useEffect, useState } from "react";
import LogIn from "../components/LogIn";
import { PageHeader } from "../components/PageHeader";
import { SmartSplitSummary } from "../components/SmartSplitSummary";
import { ISummary } from "../interfaces/ISummary";
import { IUser } from "../interfaces/IUser";
import { baseUrl } from "../utils/baseUrl";
import { fetchData } from "../utils/fetchData";

export function HomePage(props: {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  allUsers: IUser[];
  setAllUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}): JSX.Element {
  const [summary, setSummary] = useState<ISummary | undefined>();
  useEffect(() => {
    if (props.user?.id !== undefined) {
      fetchData(baseUrl + `/users/${props.user?.id}`, setSummary);
    }
  }, [props.user?.id]);
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
    console.log(summary);
    return (
      <>
        <PageHeader user={props.user} setUser={props.setUser} />
        <h2>Welcome back, {props.user.name}!</h2>
        <SmartSplitSummary {...{ summary }} user={props.user} />
      </>
    );
  }
}
