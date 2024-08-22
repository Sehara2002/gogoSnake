import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import "../../styles/registerpage.css";
import axios from 'axios';

function Registerpage() {
  const navigator = useNavigate();
  const player1 = useRef();
  const player2 = useRef();
  const clickBtn = () => {
    const player_1 = player1.current.value;
    const player_2 = player2.current.value;

    localStorage.setItem("player1", player_1);
    localStorage.setItem("player2", player_2);

    const sendData = async () =>{
      const resp = axios.get("http://192.168.43.126:8000/run/true");
      console.log(resp);
    }

    sendData();
    navigator("/game");
  }


  return (
    <div class="container_1">
      <h1 class="register-topic heading">Snake Masters <br/>Enter Your Names!</h1>
      <table>
        <tr>
          <td>
            <label for="player1_name" className='subheading'><span class="snake_1"><b>Green </b></span>Serpent Name:</label><br/><br/>
            <input class="textfield" ref={player1} type="text" id="player1_name" name="player1_name" required />
          </td>
          <td>
            <label for="player2_name" className='subheading'><span class="snake_2"><b>Blue </b></span>Serpent Name:</label><br/><br/>
            <input class="textfield" ref={player2} type="text" id="player2_name" name="player2_name" required />
          </td>
        </tr>
    </table>


      <button className='btn' onClick={() => clickBtn()} type="submit">Unleash the Battle</button>
    </div>
  )
}

export default Registerpage
