import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import "../../styles/homepage.css";

function Myhome() {

    const navigator = useNavigate();

    useEffect(()=>{
        localStorage.removeItem("player01")
        localStorage.removeItem("player01Score");
        localStorage.removeItem("player02")
        localStorage.removeItem("player02Score");
    },[])
    useEffect(() => {
        const sendData = async () =>{
            const resp = axios.get("http://192.168.43.126:8000/run/false");
            console.log(resp);
          }
      
          sendData();
        const sendTimeout = async () => {
            const resp = await axios.get(`http://192.168.43.126:8000/timeOutState/${false}`);
            console.log(resp.data);
        }

        sendTimeout();
    })
    useEffect(() => {
        const checkLoadCell = async () => {
            try {
                const response = await axios.get("http://192.168.43.126:8000/sendLoadData");
                console.log(response.data);
                if (response.data.load_Cell_data === true) {
                    navigator("/register");
                }
            } catch (error) {
                console.error("Error fetching load cell value:", error);
            }
        };

        const interval = setInterval(checkLoadCell, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div class="container_1">
            <h1 className="heading">Welcome to<span class="gogosnake"> <span class="go_1" >Go</span><span class="go_2">Go</span></span>Snake!</h1>

            <h2 className="subheading">Insert Coin to Begin the Adventure!</h2>
            <div class="container coin-container">
                <div class="coin"></div>
                <div class="small-box"></div>
                <div class="large-box"></div>
            </div>

        </div>
    )
}

export default Myhome
