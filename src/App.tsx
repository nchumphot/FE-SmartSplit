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

function App(): JSX.Element {
  const [user, setUser] = useState<IUser | undefined>();
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  useEffect(() => {
    fetchData(baseUrl + "/users", setAllUsers);
  }, []);
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<HomePage {...{ user, setUser, allUsers, setAllUsers }} />}
          />
          <Route
            path="/signup"
            element={<SignUpPage {...{ setUser, setAllUsers }} />}
          />
          <Route
            path="/friends/:id"
            element={<IndividualFriend {...{ user, setUser }} />}
          />
          <Route path="/expenses/:id" element={<IndividualExpense />} />
          <Route path="/expenses/add" element={<AddExpense />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
