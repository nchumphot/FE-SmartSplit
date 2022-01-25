import { ISummary } from "../interfaces/ISummary";
import { IUser } from "../interfaces/IUser";
import { calculateSummary } from "../utils/calculateSummary";

export function SmartSplitSummary(props: {
  summary: ISummary | undefined;
  user: IUser;
}): JSX.Element {
  if (props.summary === undefined) {
    return <h3>Loading your SmartAplit summary...</h3>;
  } else {
    const [totalMoneyBorrowed, totalMoneyLent] = calculateSummary(
      props.summary,
      props.user.id
    );
    return (
      <>
        <h3>Your SmartSplit Summary</h3>
        {totalMoneyBorrowed !== 0 && (
          <p>You owe £{totalMoneyBorrowed.toFixed(2)}.</p>
        )}
        {totalMoneyLent !== 0 && (
          <p>You are owed £{totalMoneyLent.toFixed(2)}.</p>
        )}
      </>
    );
  }
}
