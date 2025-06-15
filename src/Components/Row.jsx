import {Cell} from "./Cell";

export const Row = ({row, openCell, flagCell}) => {
  return (
    <div className={'Row'}>
      {
        row.map((value) => <Cell key={value.x} cellData={value} openCell={openCell} flagCell={flagCell}/>)
      }
    </div>
  )
}