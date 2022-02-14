import { IComment } from "../interfaces/IComment";
import { dateTimeFormatter } from "../utils/dateTimeFormatter";

export function CommentCard(props: { comment: IComment }) {
  return (
    <div>
      <h5>{props.comment.comment}</h5>
      <p>
        {props.comment.name}, {dateTimeFormatter(props.comment.creation_date)}
      </p>
    </div>
  );
}
