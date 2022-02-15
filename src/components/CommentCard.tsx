import { IComment } from "../interfaces/IComment";
import { IUser } from "../interfaces/IUser";
import { dateTimeFormatter } from "../utils/dateTimeFormatter";
import { EditCommentModal } from "./EditCommentModal";

export function CommentCard(props: {
  comment: IComment;
  setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>;
  user: IUser | undefined;
}) {
  return (
    <div>
      <h5>{props.comment.comment}</h5>
      <p>
        {props.comment.name}, {dateTimeFormatter(props.comment.creation_date)}{" "}
        {props.comment.creation_date !== props.comment.modified_date &&
          `(edited on ${dateTimeFormatter(props.comment.modified_date)})`}
      </p>
      {props.user?.id === props.comment.user_id && (
        <>
          <button
            type="button"
            className="btn btn-warning"
            data-toggle="modal"
            data-target={`#editCommentModal-${props.comment.id}`}
          >
            Edit
          </button>
          <EditCommentModal
            comment={props.comment}
            setComments={props.setComments}
          />
          <button type="button" className="btn btn-danger">
            Delete
          </button>
        </>
      )}
    </div>
  );
}
