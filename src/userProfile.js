import { useEffect, useState } from "react"
import { mockapi } from "./mockapi";
import { useNavigate } from "react-router-dom";

export default function UserProfile(){
    const [user,setUser]=useState([]);
    const nav=useNavigate();
    const storedUsername=localStorage.getItem("user");
    const getUser=()=>{
        fetch(`${mockapi}/users/profile`,{
            method:'GET',
            headers:{
                "x-auth-token":localStorage.getItem("token"),
                'Content-Type': 'application/json',
                'user':storedUsername,
            },
        })
        .then((res)=>res.json())
        .then((result)=>{
           setUser(result.user);
        });
    }
    useEffect(()=>getUser(),[])
    return(
        <div>
        <div>
                  <h1> welcome to user profile page</h1>
                  <h3>UserName : {user.username}</h3>
                  <h3>Email : {user.username}</h3>
                  </div>
                
                  </div>
   
    
    )
}

