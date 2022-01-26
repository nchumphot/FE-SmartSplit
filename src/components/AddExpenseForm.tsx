import { Link } from "react-router-dom";
import { IExpenseForm } from "../interfaces/IExpenseForm";

export default function AddExpenseForm(props: {
  details: IExpenseForm;
  setDetails: React.Dispatch<React.SetStateAction<IExpenseForm>>;
}): JSX.Element {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          className="form-control"
          value={props.details.description}
          name="description"
          onChange={(e) =>
            props.setDetails({ ...props.details, description: e.target.value })
          }
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          className="form-control"
          value={`£${props.details.amount.toFixed(2)}`}
          name="amount"
          onChange={(e) =>
            props.setDetails({
              ...props.details,
              amount: parseFloat(e.target.value),
            })
          }
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="option">Split option</label>
        <select name="option">
          <option>Paid by you and split equally</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          className="form-control"
          name="date"
          type="date"
          value={props.details.date}
          onChange={(e) =>
            props.setDetails({
              ...props.details,
              date: e.target.value,
            })
          }
        ></input>
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Add notes (optional)"
          name="notes"
          rows={4}
          value={props.details.notes}
          onChange={(e) =>
            props.setDetails({
              ...props.details,
              notes: e.target.value,
            })
          }
        ></textarea>
      </div>
      <Link to="/">
        <button type="button" className="btn btn-danger">
          Cancel
        </button>
        <button type="button" className="btn btn-success">
          Add expense
        </button>
      </Link>
    </form>
  );
}
