export function SmartSplitSummary(props: {
  netOwing: number;
  netIsOwed: number;
}): JSX.Element {
  return (
    <>
      <h3>Your SmartSplit Summary</h3>
      {props.netOwing !== 0 && <p>You owe £{props.netOwing.toFixed(2)}.</p>}
      {props.netIsOwed !== 0 && (
        <p>You are owed £{(-props.netIsOwed).toFixed(2)}.</p>
      )}
      {props.netOwing === 0 && props.netIsOwed === 0 && (
        <p>You are all settled up.</p>
      )}
    </>
  );
}
