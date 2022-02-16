import { IComment } from "../interfaces/IComment";
import { IUser } from "../interfaces/IUser";
import { dateTimeFormatter } from "../utils/dateTimeFormatter";
import { DeleteCommentModal } from "./DeleteCommentModal";
import { EditCommentModal } from "./EditCommentModal";

export function CommentCard(props: {
  comment: IComment;
  setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>;
  user: IUser | undefined;
}) {
  return (
    <div className="border border-primary m-2 p-2">
      <h5>{props.comment.comment}</h5>
      <small className="my-1">
        {props.comment.name}, {dateTimeFormatter(props.comment.creation_date)}{" "}
        {props.comment.creation_date !== props.comment.modified_date &&
          `(edited on ${dateTimeFormatter(props.comment.modified_date)})`}
      </small>
      {props.user?.id === props.comment.user_id && (
        <>
          <button
            type="button"
            className="btn btn-warning btn-sm mr-1"
            data-toggle="modal"
            data-target={`#editCommentModal-${props.comment.id}`}
          >
            Edit
          </button>
          <EditCommentModal
            comment={props.comment}
            setComments={props.setComments}
          />
          <button
            type="button"
            className="btn btn-danger btn-sm mr-1"
            data-toggle="modal"
            data-target={`#deleteCommentModal-${props.comment.id}`}
          >
            Delete
          </button>
          <DeleteCommentModal
            comment={props.comment}
            setComments={props.setComments}
          />
        </>
      )}
    </div>
  );
}
