import axios from "axios";
import { IUser } from "../interfaces/IUser";
import { baseUrl } from "./baseUrl";

export async function handleAddFriend(
  userId: number,
  email: string
): Promise<void> {
  const res1 = await fetch(baseUrl + "/users");
  const jsonBody1 = await res1.json();
  const allUsers: IUser[] = jsonBody1.data;
  const res2 = await fetch(baseUrl + `/users/${userId}`);
  const jsonBody2 = await res2.json();
  const friends: IUser[] = jsonBody2.data.friends;
  const friendEmail = [];
  for (const friend of friends) {
    friendEmail.push(friend.email);
  }
  for (const user of allUsers) {
    if (email === user.email) {
      // Check if the email is registered
      if (friendEmail.includes(email)) {
        // Check if the email is already in the friend list
        alert("This user is already in your friend list.");
        return;
      } else {
        axios.post(baseUrl + `/friends/${userId}`, { email: email });
        alert("Friend added successfuly.");
        return;
      }
    }
  }
  alert("A user with the email address provided does not exist.");
}
