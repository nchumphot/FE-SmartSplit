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
  const [details, setDetails] = useState<IExpenseForm>({
    description: "",
    amount: 0,
    option: "",
    date: "",
    notes: "",
  });
  useEffect(() => {
    if (userInfo !== undefined) {
      setAllFriends(userInfo.friends);
    } else {
      fetchData(baseUrl + `/users/${props.user?.id}`, setUserInfo);
    }
  }, [props.user?.id, userInfo]);

  console.log(selectedFriends.length);
  return (
    <div>
      <PageHeader user={props.user} setUser={props.setUser} />
      <h2>Add an expense</h2>
      <FriendDropDown
        {...{ allFriends, selectedFriends, setSelectedFriends }}
      />
      <AddExpenseForm {...{ details, setDetails }} />
    </div>
  );
}
