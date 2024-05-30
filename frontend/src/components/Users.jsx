import { useEffect, useState } from "react";
import Button from './Button'
import axios  from "axios";
import { useNavigate } from "react-router-dom";


export const Users=()=>{
    const [users,setUsers]= useState([]);
    const [filter,setFilter]=useState("");
    const token=localStorage.getItem('token');
    const headers={
        Authorization:`Bearer ${token}`
    }

    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/user/bulk?filter='+filter, {headers:headers})
        .then(res=>{
            setUsers(res.data.user)
        })
    },[filter])
    console.log(users);
    return(
        <div>
                    <div>Users</div>
                    <div>
                        <input type="text" onChange={(e)=>{
                            setFilter(e.target.value);
                        }} placeholder="Search Users..."  />
                    </div>
                    <div>
                        {users.map((user)=>{
                             <User user={user}></User>
                        })}
                    </div>
        </div>
    )
}

export const User=({user})=>{
    const navigate=useNavigate();
        return(
            <div>
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                    <div>
                        <Button onClick={(e)=>{
                                navigate('/send?id='+user._id+ "&name="+user.firstName);
                        }} value="Send Money"></Button>
                    </div>
            </div>
        )
}