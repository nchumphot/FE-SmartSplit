import LogIn from "../components/LogIn";
import { PageHeader } from "../components/PageHeader";
import { IUser } from "../interfaces/IUser";

export function HomePage(props: {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  allUsers: IUser[];
  setAllUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
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
    return (
      <>
        <PageHeader user={props.user} setUser={props.setUser} />
        <h2>Welcome back, {props.user.name}!</h2>
      </>
    );
  }
}
