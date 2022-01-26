import { IUser } from "../interfaces/IUser";
import { getUserById } from "./getUserById";

export function handleSelectFriend(
  friendId: number,
  selection: IUser[],
  allFriends: IUser[]
): IUser[] {
  const result = selection;
  const newFriend = getUserById(allFriends, friendId);
  result.push(newFriend);
  return result;
}
