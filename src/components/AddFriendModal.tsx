import { useState } from "react";
import { IUser } from "../interfaces/IUser";
import { handleAddFriend } from "../utils/handleAddFriend";

export function AddFriendModal(props: { user: IUser }): JSX.Element {
  const [email, setEmail] = useState<string>("");

  return (
    <div
      className="modal fade"
      id="addFriendModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add a friend on SmartSplit</h5>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={() => setEmail("")}
            >
              Not now
            </button>
            {props.user !== undefined && (
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={() => {
                  handleAddFriend(props.user.id, email);
                  setEmail("");
                }}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
