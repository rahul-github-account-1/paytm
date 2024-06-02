import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Button from  '../components/Button'
import axios  from "axios";
function SendMoney(){
    const [searchParams]=useSearchParams();
    const id=searchParams.get("id");
    const name=searchParams.get("name");
    const [amount, setAmount]=useState(0);
    return(
        <div>
            <h2>Send Money</h2>
            <h3>{name}</h3>
            <h4> Amount:</h4>
            <div><input type="number" onChange={(e)=>{
                setAmount(e.target.value)
            }} /></div>
            <div><Button value={"Send"} onClick={()=>{
                axios.post('http://localhost:3000/api/v1/account/transfer',{
                    to:id,
                    amount:amount
                },{headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                }})
            }}> </Button></div>
        </div>
    )
}

export default SendMoney;