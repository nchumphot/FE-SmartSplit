import { IComment } from "../interfaces/IComment";
import { IUser } from "../interfaces/IUser";
import { dateTimeFormatter } from "../utils/dateTimeFormatter";

export function CommentCard(props: {
  comment: IComment;
  user: IUser | undefined;
}) {
  return (
    <div>
      <h5>{props.comment.comment}</h5>
      <p>
        {props.comment.name}, {dateTimeFormatter(props.comment.creation_date)}
      </p>
      {props.user?.id === props.comment.user_id && (
        <>
          <button type="button" className="btn btn-warning">
            Edit
          </button>
          <button type="button" className="btn btn-danger">
            Delete
          </button>
        </>
      )}
    </div>
  );
}
