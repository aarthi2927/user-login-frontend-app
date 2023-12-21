import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockapi } from "./mockapi";
import './App.css';
import Headers from './Header';
export default function Login(){
  const [user,setUser]=useState(null);
  const [username,setUserName]=useState("");
  const [password,setPassword]=useState("");
  const history=useNavigate();
  const userlogin=()=>{
    const loginContent={
      username,password
    };
    console.log(loginContent);
    fetch(`${mockapi}/users/login`,{
      method:"POST",
      body:JSON.stringify(loginContent),
      headers:{
        "Content-type":"application/json",
        },
         })
         .then((res)=>res.json())
         .then((result)=>{
        localStorage.setItem('token',result.token);
          localStorage.setItem('user',username);
          console.log(username);
          history('/file');
         })
  }
    return(
<div className="loginpage">
  <Headers/>
 <div className="add-user-form">
    <h1>Login</h1>
    <input label="Username" placeholder="Username" 
      type="text" onChange={(event) => setUserName(event.target
      .value)} required/>
        <br/>
      <input label="Password" placeholder="password" type="password" onChange={(event) => setPassword(event.target
        .value)} required/><br/>
<button variant="contained" onClick={userlogin}>Login</button> 
<br/>
        <span className="login-span">Create a new Account<button className="login-span-button" onClick={()=>history('/register')}>Register</button></span>
          </div>
       </div>
    )
}