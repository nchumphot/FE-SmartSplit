import { Link } from "react-router-dom";
import { IUser } from "../interfaces/IUser";

export function PageHeader(props: {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}): JSX.Element {
  return (
    <>
      <h1>SmartSplit</h1>
      {props.user !== undefined && (
        <>
          <p>{props.user.name}</p>
          <Link to="/">
            <button
              onClick={() => {
                props.setUser(undefined);
              }}
            >
              Log out
            </button>
          </Link>
        </>
      )}
    </>
  );
}
