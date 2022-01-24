import axios, { AxiosError } from "axios";
import { baseUrl } from "./baseUrl";
import { IUser } from "../interfaces/IUser";
import { fetchData } from "./fetchData";
import { validateSignUp } from "./validateSignUp";

export function handleSignUp(
  details: { name: string; email: string },
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>,
  setAllUsers: React.Dispatch<React.SetStateAction<IUser[]>>,
  setDetails: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
    }>
  >
): void {
  const canSignUp = validateSignUp(details);
  if (canSignUp) {
    axios
      .post(baseUrl + "/users", details)
      .then((res) => {
        setUser(res.data.data[0]);
      })
      .catch((error: AxiosError) => {
        if (error.response!.status === 406) {
          alert("The email address provided is already registered.");
        }
      });
    fetchData(baseUrl + "/users", setAllUsers);
    setDetails({
      name: "",
      email: "",
    });
  } else {
    setDetails({
      name: "",
      email: "",
    });
  }
}
