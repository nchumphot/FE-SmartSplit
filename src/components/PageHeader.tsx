import { Link } from "react-router-dom";
import { IUser } from "../interfaces/IUser";

export function PageHeader(props: {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}): JSX.Element {
  return (
    <div className="bg bg-success p-2">
      <div className="container-fluid">
        <div className="row">
          <div className="col-9">
            <Link to="/">
              <h1 className="text-light">SmartSplit</h1>
            </Link>
          </div>
          {props.user !== undefined && (
            <>
              <p className="col my-auto text-light">{props.user.name}</p>
              <div className="col my-auto">
                <Link to="/">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      props.setUser(undefined);
                    }}
                  >
                    Log out
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
