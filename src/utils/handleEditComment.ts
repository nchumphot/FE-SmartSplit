import axios from "axios";
import { IComment } from "../interfaces/IComment";
import { baseUrl } from "./baseUrl";
import { fetchData } from "./fetchData";

export function handleEditComment(
  commentId: number,
  expenseId: number,
  comment: string,
  setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>
) {
  axios
    .patch(baseUrl + `/comments/${commentId}`, { comment: comment })
    .then(() => {
      fetchData(baseUrl + `/comments/${expenseId}`, setComments);
    });
}
