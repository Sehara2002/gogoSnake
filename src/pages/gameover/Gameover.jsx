import React, { useEffect, useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import "../../styles/gameover.css";
import axios from "axios";

const Gameover = () => {
  // const winnername = ;
  // const winnerscore = ;
  const [winner, setWinner] = useState();
  const [score, setScore] = useState();
  const [player1, setPlayer1] = useState(localStorage.getItem("player01"));
  const [player2, setPlayer2] = useState(localStorage.getItem("player02"));
  const [player1Score, setPlayer1Score] = useState(localStorage.getItem("player01Score"));
  const [player2Score, setPlayer2Score] = useState(localStorage.getItem("player02Score"));

  useEffect(()=>{
    if(player1Score>player2Score){
      setWinner(player1);
      setScore(player1Score);
    }else if(player1Score===player2Score){
      setWinner("Draw");
      setScore(player1Score);
    }else{
      setWinner(player2);
      setScore(player2Score);
    }
  })
  useEffect(() => {

    const sendTimeout = async () => {
      const resp = await axios.get(`http://192.168.43.126:8000/timeOutState/${true}`);
      console.log(resp.data);
    }

    sendTimeout();

  }, [])

  const navigator = useNavigate();

  const handlePlayAgain = () => {

    const sendTimeout = async () => {
      const resp = await axios.get(`http://192.168.43.126:8000/timeOutState/${false}`);
      console.log(resp.data);
    }

    sendTimeout();
    navigator("/");

    
  };
  return (
    <div className="container_1">
      <h1 className='heading auto-font-size' id='text'>Game Over!</h1>
      <h2 className='subheading'>Congratulations! Snake Master <span id="winner-name">{winner}</span></h2>
      <h3>Your skill is unmatched with a score of <br /> <span id="winner-score">{score}</span></h3>
      <button className="btn" onClick={handlePlayAgain}>Play Again</button>
    </div>
  )

};

export default Gameover;
