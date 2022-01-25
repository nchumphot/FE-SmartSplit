import { IFriendSummary } from "../interfaces/IFriendSummary";

export function friendFilter(option: string, friend: IFriendSummary) {
  if (option === "All") {
    return true;
  } else if (option === "People with outstanding balance") {
    return friend.balance !== undefined && friend.balance !== 0;
  } else if (option === "People you owe") {
    return friend.balance !== undefined && friend.balance > 0;
  } else if (option === "People who owe you") {
    return friend.balance !== undefined && friend.balance < 0;
  }
}
