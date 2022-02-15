import axios from "axios";
import { IComment } from "../interfaces/IComment";
import { baseUrl } from "./baseUrl";
import { fetchData } from "./fetchData";

export function handleDeleteComment(
  commentId: number,
  expenseId: number,
  setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>
): void {
  axios
    .delete(baseUrl + `/comments/${commentId}`)
    .then(() => fetchData(baseUrl + `/comments/${expenseId}`, setComments));
}
