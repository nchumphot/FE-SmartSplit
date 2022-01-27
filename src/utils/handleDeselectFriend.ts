import { IUser } from "../interfaces/IUser";

export function handleDeselectFriend(
  friendId: number,
  selection: IUser[]
): IUser[] {
  return selection.filter((friend) => friend.id !== friendId);
}
