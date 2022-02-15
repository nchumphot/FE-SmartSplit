import { useState } from "react";
import { IComment } from "../interfaces/IComment";
import { handleEditComment } from "../utils/handleEditComment";

export function EditCommentModal(props: {
  comment: IComment;
  setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>;
}): JSX.Element {
  const [comment, setComment] = useState<string>(props.comment.comment);
  return (
    <div
      className="modal fade"
      id={`editCommentModal-${props.comment.id}`}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit comment</h5>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="comment">Comment</label>
                <input
                  className="form-control"
                  value={comment}
                  name="comment"
                  onChange={(e) => setComment(e.target.value)}
                ></input>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={() => setComment(props.comment.comment)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success"
              data-dismiss="modal"
              onClick={() => {
                handleEditComment(
                  props.comment.id,
                  props.comment.expense_id,
                  comment,
                  props.setComments
                );

                setComment(props.comment.comment);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
