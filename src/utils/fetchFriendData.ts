import { baseUrl } from "./baseUrl";
import { fetchData } from "./fetchData";
import { IFriend } from "../interfaces/IFriend";

export function fetchFriendData(
  fakeId: string | undefined,
  userId: number | undefined,
  setFriendInfo: React.Dispatch<React.SetStateAction<IFriend | undefined>>
): void {
  if (fakeId !== undefined && userId !== undefined) {
    const realId = (parseInt(fakeId) - 13) / 199;
    fetchData(baseUrl + `/friends/${userId}/${realId}`, setFriendInfo);
  }
}
