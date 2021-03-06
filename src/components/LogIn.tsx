import { Link } from "react-router-dom";
import { IUser } from "../interfaces/IUser";
import { getUserById } from "../utils/getUserById";

export default function LogIn(props: {
  allUsers: IUser[];
  setAllUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}): JSX.Element {
  if (props.allUsers.length === 0) {
    return (
      <div>
        <label htmlFor="login">Log in:</label>
        <p>Loading users...</p>
      </div>
    );
  } else {
    return (
      <div>
        <label htmlFor="login">Log in:</label>
        <select
          name="login"
          defaultValue={""}
          onChange={(e) => {
            props.setUser(
              getUserById(props.allUsers, parseInt(e.target.value))
            );
          }}
        >
          <option value="" disabled>
            Please select your name to log in
          </option>
          {props.allUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <Link to="/signup">
          <button type="button" className="btn btn-primary">
            Sign up
          </button>
        </Link>
      </div>
    );
  }
}
