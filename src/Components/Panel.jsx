import {FlagCounter} from "./FlagCounter";
import {Reset} from "./Reset";
import {Timer} from "./Timer";

export const Panel = ({time, flags, setGameStatus}) => {
  return (
    <div className='Panel'>
      <FlagCounter flags={flags}/>
      <Reset setGameStatus={setGameStatus}/>
      <Timer time={time}/>
    </div>
  )
}