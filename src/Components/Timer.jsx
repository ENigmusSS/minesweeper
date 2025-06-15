export const Timer = ({time}) => {
  return (
    <p className={"panel-element"}>
      {time.toString().slice(0, -2)}:{time.toString().slice(-2)}
    </p>
  );
}
