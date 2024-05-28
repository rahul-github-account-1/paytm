import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading';
import InputBox  from '../components/InputBox';
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning';
import { useState } from 'react';
import axios from 'axios'
import {useNavigate} from "react-router-dom"
function Signup(){
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [email,setEmail]=useState("")
    const [Password,setPassword]=useState("")
    const navigate = useNavigate();


    return(
            <div>
                <Heading value="SignUp"/>
                <SubHeading value="Create Your Account"></SubHeading>
                <InputBox label="First Name" onChange={e=>{setFirstName(e.target.value)}}></InputBox>
                <InputBox label="Last Name" onChange={e=>{setLastName(e.target.value)}}></InputBox>
                <InputBox label="Email" onChange={e=>{setEmail(e.target.value)}}></InputBox>
                <InputBox label="Password" onChange={e=>{setPassword(e.target.value)}}></InputBox>
                <Button value="SignUp" onClick={async ()=>{
                    const response= await axios.post("http://localhost:3000/api/v1/user/signup",
                        {
                            username:email,
                            password:Password,
                            firstName:firstName,
                            lastName:lastName
                        }
                    );
                    navigate('/signin')
                }}></Button>
                <BottomWarning label="Already have an account" buttonText="Signin Here"></BottomWarning>
            </div>
    )
}

export default Signup;