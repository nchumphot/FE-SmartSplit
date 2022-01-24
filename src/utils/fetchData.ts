import { IUser } from "../interfaces/IUser";

export function fetchData(
  url: string,
  setState: React.Dispatch<React.SetStateAction<IUser[]>>
): void {
  fetch(url)
    .then((res) => res.json())
    .then((jsonBody) => setState(jsonBody.data));
}
