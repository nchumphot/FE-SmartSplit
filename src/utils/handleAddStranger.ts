import axios from "axios";
import { ISummary } from "../interfaces/ISummary";
import { baseUrl } from "./baseUrl";
import { fetchData } from "./fetchData";

export async function handleAddStranger(
  userId: number,
  friendId: number,
  setSummary: React.Dispatch<React.SetStateAction<ISummary | undefined>>
): Promise<void> {
  const res = await fetch(baseUrl + `/users/${friendId}`);
  const jsonBody = await res.json();
  const emailToAdd = jsonBody.data.info[0].email;
  axios.post(baseUrl + `/friends/${userId}`, { email: emailToAdd });
  fetchData(baseUrl + `/users/${userId}`, setSummary);
}
