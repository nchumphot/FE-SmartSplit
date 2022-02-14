import axios from "axios";
import { IComment } from "../interfaces/IComment";
import { baseUrl } from "./baseUrl";
import { fetchData } from "./fetchData";

export async function handleAddComment(
  userId: number | undefined,
  expenseId: number,
  comment: string,
  setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>
): Promise<void> {
  if (userId === undefined) {
    alert("You must log in to add a comment.");
  } else {
    axios
      .post(baseUrl + `/comments/${expenseId}`, {
        userId: userId,
        comment: comment,
      })
      .then(() => {
        fetchData(baseUrl + `/comments/${expenseId}`, setComments);
      });
  }
}
