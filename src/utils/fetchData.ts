import { IUser } from "../interfaces/IUser";
import { ISummary } from "../interfaces/ISummary";

export function fetchData(
  url: string,
  setState:
    | React.Dispatch<React.SetStateAction<IUser[]>>
    | React.Dispatch<React.SetStateAction<ISummary | undefined>>
): void {
  fetch(url)
    .then((res) => res.json())
    .then((jsonBody) => setState(jsonBody.data));
}
