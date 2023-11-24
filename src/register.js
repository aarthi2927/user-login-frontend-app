import { useState } from "react";
import { mockapi } from "./mockapi";
import { useNavigate } from 'react-router-dom';
export default function Register(){
    const [username,setUserName]=useState("");
    const [email,SetEmail]=useState("");
    const [password,setPassword]=useState("");
    const history=useNavigate();
    const register=()=>{
        const reguser={
            username:username,
            email:email,
            password:password
        };
        fetch(`${mockapi}/users/register`,{
            method:"POST",
            body:JSON.stringify(reguser),
            headers:{
                "Content-type":"application/json",
            },
        })
        .then((res)=>{
            res.json();
        })
        .then((result)=>{
            alert("User Added Successfully");
            history('/login');
        });
    
    }
    return(
<div className="add-movie-form">
    <h1>Register</h1>
       <input label="Username" placeholder="Username" 
      type="text" onChange={(event) => setUserName(event.target
        .value)} required /><br/>
              <input label="Email" placeholder="Email" 
      type="text" onChange={(event) => SetEmail(event.target
        .value)} required /><br/>
      <input label="Password" placeholder=" password" type="password" onChange={(event) => setPassword(event.target
        .value)} required /><br/>
      <button variant="contained" type="submit" onClick={()=>register()}>Register</button>
      <p>Already have a Account<button onClick={()=>history('/login')}>Login</button></p>
     
    </div>
    )
}