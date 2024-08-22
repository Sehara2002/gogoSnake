
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/gamepage.css";
import { useNavigate } from "react-router-dom";

const Gamepage = () => {

    const navigator = useNavigate();
    const [player1] = useState(localStorage.getItem("player1"));
    const [player2] = useState(localStorage.getItem("player2"));
    const [count, setCount] = useState(300);  // 3 minutes countdown
    const [gameData, setGameData] = useState({});

    useEffect(() => {
        const interval = setInterval(async () => {
            const response = await axios.get("http://192.168.43.126:8000/game_data");
            console.log(response.data);
            setGameData(response.data);
            setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval2 = setInterval(async () => {
            const resp = await axios.get("http://192.168.43.126:8000/sendCrashed");
            console.log(resp.data.crashedState);
            if (resp.data.crashedState === true) {
                navigator("/gameover");
            }
        }, 1000);
        return () => clearInterval(interval2);
    }, [])
    useEffect(() => {
        if (count === 0) {
            navigator("/gameover");
        } else {
            // localStorage.setItem("player01", player1)
            // localStorage.setItem("player01Score", gameData.player01Score);
            // localStorage.setItem("player02", player2)
            // localStorage.setItem("player02Score", gameData.player02Score);
        }
    }, [count, gameData, player1, player2]);


    localStorage.setItem("player01", player1);
    localStorage.setItem("player01Score", gameData.player01Score);
    localStorage.setItem("player02", player2);
    localStorage.setItem("player02Score", gameData.player02Score);
    return (
        <div className="game container_1">
            <h1 className='heading'><i>Engage in the Venomous Battle!</i></h1>
            <div>
                <h2 className='subheading'>The showdown ends in <span id="countdown">{count}</span> seconds!</h2>
            </div>
            <div className="player">
                <div className="pla">
                    <h3>Green Serpent: {player1}</h3>
                    <p>Score:<br /><span className="num" id="player1_score">{gameData.player01Score}</span></p>
                    <p>Remaining Strikes:<br /><span className="num" id="player1_chances">{gameData.player01Shooting}</span></p>
                </div>
                <div className="pla">
                    <h3>Blue Serpent: {player2}</h3>
                    <p>Score:<br /><span className="num" id="player2_score">{gameData.player02Score}</span></p>
                    <p>Remaining Strikes:<br /><span className="num" id="player2_chances">{gameData.player02Shooting}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Gamepage;
