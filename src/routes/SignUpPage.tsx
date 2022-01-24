import { PageHeader } from "../components/PageHeader";
import { IUser } from "../interfaces/IUser";
import { useState } from "react";
import { handleSignUp } from "../utils/handleSignUp";
import { Link } from "react-router-dom";

export function SignUpPage(props: {
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  setAllUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}): JSX.Element {
  const [details, setDetails] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });
  return (
    <>
      <PageHeader user={undefined} setUser={props.setUser} />
      <h2>Create a SmartSplit account</h2>

      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            value={details.name}
            name="name"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="name">Email address</label>
          <input
            className="form-control"
            value={details.email}
            name="email-address"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          ></input>
        </div>
      </form>

      <Link to="/">
        <button
          type="button"
          className="btn btn-danger"
          data-dismiss="modal"
          onClick={() =>
            setDetails({
              name: "",
              email: "",
            })
          }
        >
          Not now
        </button>
        <button
          type="button"
          className="btn btn-primary"
          data-dismiss="modal"
          onClick={() =>
            handleSignUp(details, props.setUser, props.setAllUsers, setDetails)
          }
        >
          Sign up
        </button>
      </Link>
    </>
  );
}
