import { IMoneyBorrowed, IMoneyLent } from "../interfaces/ISummary";
import { IUser } from "../interfaces/IUser";

export function getNonFriendList(
  myId: number,
  friends: IUser[],
  moneyBorrowed: IMoneyBorrowed[],
  moneyLent: IMoneyLent[]
): { id: number; name: string }[] {
  const friendId: number[] = [];
  for (const friend of friends) {
    friendId.push(friend.id);
  }
  const nonFriendId: number[] = [];
  const nonFriend: { id: number; name: string }[] = [];
  for (const item of moneyBorrowed) {
    if (
      item.lender_id !== myId &&
      !friendId.includes(item.lender_id) &&
      !nonFriendId.includes(item.lender_id)
    ) {
      nonFriendId.push(item.lender_id);
      nonFriend.push({ id: item.lender_id, name: item.lender_name });
    }
  }
  for (const item of moneyLent) {
    if (
      item.borrower_id !== myId &&
      !friendId.includes(item.borrower_id) &&
      !nonFriendId.includes(item.borrower_id)
    ) {
      nonFriendId.push(item.borrower_id);
      nonFriend.push({ id: item.borrower_id, name: item.borrower_name });
    }
  }
  return nonFriend;
}
