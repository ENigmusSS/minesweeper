export const Reset = ({setGameStatus}) => {
  return (
    <button className={'button panel-element'} onClick={()=> setGameStatus('beforeStart')}>Reset</button>
  )
}