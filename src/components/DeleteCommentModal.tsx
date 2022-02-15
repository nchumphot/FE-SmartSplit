import { IComment } from "../interfaces/IComment";
import { handleDeleteComment } from "../utils/handleDeleteComment";

export function DeleteCommentModal(props: {
  comment: IComment;
  setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>;
}): JSX.Element {
  return (
    <div
      className="modal fade"
      id={`deleteCommentModal-${props.comment.id}`}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete comment</h5>
          </div>
          <div className="modal-body">
            <h6>Are you sure that you want to delete this comment?</h6>
            <p>{props.comment.comment}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-warning"
              data-dismiss="modal"
            >
              Not now
            </button>

            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={() => {
                handleDeleteComment(
                  props.comment.id,
                  props.comment.expense_id,
                  props.setComments
                );
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
