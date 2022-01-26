import { IUser } from "../interfaces/IUser";

export function handleUnselectFriend(
  friendId: number,
  selection: IUser[]
): IUser[] {
  return selection.filter((friend) => friend.id !== friendId);
}
