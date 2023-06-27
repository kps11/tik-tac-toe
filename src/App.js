import {useEffect, useRef, useState} from "react"
import "./App.css"
import Confetti from 'react-confetti'

function App() {
  const boardArray = useRef(Array.from({length:9},() => 0))
  const playerOne = useRef([]) 
  const playerTwo = useRef([])
  const [activePlayer, setActivePlayer] = useState("playerOne")
  const [winner,setWinner] = useState("")
  

  const updateBoardArray = (boardArray, id, activePlayer) =>{
    let newArr = [...boardArray.current];
    newArr.map((item, index) =>{
      if (index == id){
        activePlayer == "playerOne" ? newArr[index]= "X" : newArr[index] = "O";
      }
    })
    return newArr;
  }

  const checkWinner =() =>{
    let activePlayerBoard = activePlayer == "playerOne" ? playerOne.current : playerTwo.current;
    if(activePlayerBoard.indexOf(0) >= 0){
        if((activePlayerBoard.indexOf(1) >= 1 && activePlayerBoard.indexOf(2) >= 0) || (activePlayerBoard.indexOf(4) >= 1 && activePlayerBoard.indexOf(8) >= 0) || (activePlayerBoard.indexOf(3) >= 1 && activePlayerBoard.indexOf(6) >= 0) ){
          return activePlayer;
        }
      } if(activePlayerBoard.indexOf(1) >= 0){
        if( activePlayerBoard.indexOf(4) >= 0 && activePlayerBoard.indexOf(7) >= 0){
          return activePlayer;
        }
      }if(activePlayerBoard.indexOf(2) >=0){
        if( (activePlayerBoard.indexOf(5) >= 0 && activePlayerBoard.indexOf(8) >=0) || (activePlayerBoard.indexOf(4) >= 0 && activePlayerBoard.indexOf(6) >= 0)){
            return activePlayer;
        }
      }if( activePlayerBoard.indexOf(3) >= 0){
        if(activePlayerBoard.indexOf(4) >= 0 && activePlayerBoard.indexOf(5) >=0 ){
          return activePlayer;
        }
      } if(activePlayerBoard.indexOf(6) >=0){
        if(activePlayerBoard.indexOf(7) >= 0 && activePlayerBoard.indexOf(8) >=0 ){
          return activePlayer;
        }
      }

    
  }

  const onClickBox =(id) =>{
    let updateBoard,winner;
    if(activePlayer == "playerOne"){
      setActivePlayer("playerTwo")
     playerOne.current =  [...playerOne.current,id]
    }else {
      setActivePlayer("playerOne")
      playerTwo.current = [...playerTwo.current,id]
    }
    updateBoard = updateBoardArray(boardArray, id, activePlayer)
    boardArray.current = updateBoard

    if ( playerOne.current.length >=3 || playerTwo.current.length >= 3){
       winner = checkWinner()
    }

    setWinner(winner)
  }

  const onClickRestart = () =>{
      boardArray.current = Array.from({length:9},() => 0)
      playerOne.current = [] 
      playerTwo.current = []
      setActivePlayer("playerOne")
      setWinner("")
  }
  

  return (
    <div className="App">
        {winner != undefined && winner.length > 0 && <div className="popUpContainer"> 
      
            <Confetti width={800} height={830}/>
            <span className="winner"> The Winner is {winner} </span> 
            
            </div>}

      <div className="restartButton">
        <button className="button" onClick={() => onClickRestart() }> Restart</button>
      </div>

      <div className="container" disabled={winner && winner.length >0 ? true : false}>
        { boardArray.current.map((item, id) =>{
          return (
            <div key={id} className="box" onClick={(winner && winner.length >0 ) || (typeof( boardArray.current[id]) === "string") ? null :()=> onClickBox(id)}>
              {item != 0 ? item : ""}
              </div>
          )
        })
        
        }

      </div>
      <div className="userContainer">
        <button className="button" style={{ backgroundColor : activePlayer === "playerOne" ? "#fff" : "lightgrey" , color: activePlayer === "playerOne" ? "#000" : "#fff"  }}>Player One</button>

        <button className="button" style={{ backgroundColor : activePlayer === "playerTwo" ?  "#fff" :"lightgray" ,  color: activePlayer === "playerTwo" ? "#000" : "#fff"}}>Player Two</button>
      </div>
    </div>
  );
}

export default App;
