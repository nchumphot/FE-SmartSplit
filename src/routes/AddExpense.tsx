import { useEffect, useState } from "react";
import AddExpenseForm from "../components/AddExpenseForm";
import { FriendDropDown } from "../components/FriendDropDown";
import { PageHeader } from "../components/PageHeader";
import { IExpenseForm } from "../interfaces/IExpenseForm";
import { IGetUser } from "../interfaces/IGetUser";
import { IUser } from "../interfaces/IUser";
import { baseUrl } from "../utils/baseUrl";
import { fetchData } from "../utils/fetchData";

export function AddExpense(props: {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}): JSX.Element {
  const [userInfo, setUserInfo] = useState<IGetUser | undefined>();
  const [allFriends, setAllFriends] = useState<IUser[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<IUser[]>([]);
  const today = new Date().toISOString().slice(0, 10);
  const [details, setDetails] = useState<IExpenseForm>({
    description: "",
    amount: "0",
    lenderId: 0,
    option: "Split equally",
    date: today,
    notes: "",
  });
  useEffect(() => {
    if (userInfo !== undefined) {
      setAllFriends(userInfo.friends);
    } else {
      fetchData(baseUrl + `/users/${props.user?.id}`, setUserInfo);
    }
  }, [props.user?.id, userInfo]);
  useEffect(() => {
    if (props.user !== undefined) {
      let softCopy = details;
      softCopy.lenderId = props.user.id;
      setDetails(softCopy);
    }
  }, [props.user, details]);
  return (
    <div>
      <PageHeader user={props.user} setUser={props.setUser} />
      <div className="mx-4 my-3">
        <h2>Add an expense</h2>
        <FriendDropDown
          {...{ allFriends, selectedFriends, setSelectedFriends }}
        />
        <AddExpenseForm
          {...{ details, setDetails, selectedFriends }}
          user={props.user}
        />
      </div>
    </div>
  );
}
