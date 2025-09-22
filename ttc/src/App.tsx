import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {

  const handleClick = () => {
    console.log("Click registered.")
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>

      <div>
        <Square handleClick = {handleClick}/>
        <Square handleClick = {handleClick}/>
        <Square handleClick = {handleClick}/>
      </div>

      <div>
        <Square handleClick = {handleClick}/>
        <Square handleClick = {handleClick}/>
        <Square handleClick = {handleClick}/>
      </div>

      <div>
        <Square handleClick = {handleClick}/>
        <Square handleClick = {handleClick}/>
        <Square handleClick = {handleClick}/>
      </div>


    </>
  )
}

const Square = ({ handleClick }) => {

  const [clicked, setClicked] = useState(false)

  return(
    <>
      <button onClick={() => handleClick}> X </button>
    </>
  )
}
export default App
