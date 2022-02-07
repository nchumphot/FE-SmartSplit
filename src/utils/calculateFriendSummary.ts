import { IFriend } from "../interfaces/IFriend";
import { ISummary } from "../interfaces/ISummary";
import { IUser } from "../interfaces/IUser";
import { IFriendSummary } from "../interfaces/IFriendSummary";
import { calculateBalanceForAll } from "./calculateBalanceforAll";

export function calculateFriendSummary(
  user: IUser | undefined,
  friendInfo: IFriend | undefined,
  summary: ISummary | undefined,
  setThisFriendSummary: React.Dispatch<React.SetStateAction<IFriendSummary[]>>
): void {
  if (user !== undefined && friendInfo !== undefined && summary !== undefined) {
    const friendSummary = calculateBalanceForAll(
      user.id,
      friendInfo.info,
      summary
    );
    setThisFriendSummary(friendSummary);
  }
}
