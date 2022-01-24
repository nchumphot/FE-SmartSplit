import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./routes/HomePage";
import { IndividualFriend } from "./routes/IndividualFriend";
import { IndividualExpense } from "./routes/IndividualExpense";
import { AddExpense } from "./routes/AddExpense";

function App(): JSX.Element {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/friends/:id" element={<IndividualFriend />} />
          <Route path="/expenses/:id" element={<IndividualExpense />} />
          <Route path="/expenses/add" element={<AddExpense />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
