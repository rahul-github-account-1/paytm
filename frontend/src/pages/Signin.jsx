import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import {useState} from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios'
function Signin(){
    const [email,setEmail]=useState("")
    const [Password,setPassword]=useState("")
    const navigate=useNavigate();
    return(
        <div>
            <Heading value="Signin"></Heading>
            <SubHeading value="Login to your Account"></SubHeading>
            <InputBox onChange={(e)=>{setEmail(e.target.value)}} label="Email"></InputBox>
            <InputBox onChange={(e)=>{setPassword(e.target.value)}} label="Password"></InputBox>
            <Button onClick={async ()=>{
                    const response= await axios.post('http://localhost:3000/api/v1/user/signin',{
                        username:email,
                        password:Password
                    })
                    print(response)
                    localStorage.setItem("token", response.data.token)
                    navigate('/dashboard');

            }} value="SignIn"></Button>
            <BottomWarning label="Don't have Account ? " buttonText="SignUp Here"></BottomWarning>
        </div>
    )
}


export default Signin;