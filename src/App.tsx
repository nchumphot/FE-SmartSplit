import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./routes/HomePage";
import { IndividualFriend } from "./routes/IndividualFriend";
import { IndividualExpense } from "./routes/IndividualExpense";
import { AddExpense } from "./routes/AddExpense";
import { useEffect, useState } from "react";
import { IUser } from "./interfaces/IUser";
import { fetchData } from "./utils/fetchData";
import { baseUrl } from "./utils/baseUrl";
import { SignUpPage } from "./routes/SignUpPage";
import { ISummary } from "./interfaces/ISummary";

function App(): JSX.Element {
  const [user, setUser] = useState<IUser | undefined>();
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [summary, setSummary] = useState<ISummary | undefined>();

  useEffect(() => {
    fetchData(baseUrl + "/users", setAllUsers);
  }, []);
  useEffect(() => {
    if (user?.id !== undefined) {
      fetchData(baseUrl + `/users/${user?.id}`, setSummary);
    }
  }, [user?.id]);
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                {...{
                  user,
                  setUser,
                  allUsers,
                  setAllUsers,
                  summary,
                  setSummary,
                }}
              />
            }
          />
          <Route
            path="/signup"
            element={<SignUpPage {...{ setUser, setAllUsers }} />}
          />
          <Route
            path="/friends/:id"
            element={<IndividualFriend {...{ user, setUser }} />}
          />
          <Route
            path="/expenses/:id"
            element={<IndividualExpense {...{ user, setUser }} />}
          />
          <Route
            path="/expenses/add"
            element={<AddExpense {...{ user, setUser }} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
