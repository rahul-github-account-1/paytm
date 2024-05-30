import { useEffect, useState } from "react";
import AppBar from "../components/AppBar"
import Balance from "../components/Balance"
import {Users} from '../components/Users'
import axios from "axios";
function Dashboard(){
    const [balance, setBalance]=useState("");
    const [firstName,setFirstName]=useState("");
    const [curr,setCurr]=useState("");
  
    useEffect(()=>{
        const token=localStorage.getItem('token');
        const headers={
            Authorization:`Bearer ${token}`
        }
        axios.get('http://localhost:3000/api/v1/account/balance',{headers:headers})
        .then(res=>{
                setBalance(res.data.balance)
        })
    },[])
    return(
        <div> 
            <AppBar  ></AppBar>
            <Balance  value={balance}></Balance>
            <Users ></Users>
        </div>
    )
}

export default Dashboard