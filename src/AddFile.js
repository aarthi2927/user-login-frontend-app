import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { mockapi } from './mockapi';
import Headers from "./Header";
import "./App.css";
export function AddFile() {
  const [filelist,setFileList] = useState({ });
  const [filedata, setFiledata] = useState("");
  const [heading, setHeading] = useState(" ");
   const [subheading, setSubheading] = useState("");
   const [description, setDescription] = useState("");
   const history=useNavigate();

const addfile=async(e)=>{
  e.preventDefault();
  const data = new FormData();
  data.append('filedata', filedata);
  data.append('heading', heading);
  data.append('subheading', subheading);
  data.append('description', description);
  try {
    const response = await fetch(`${mockapi}/files/add`, {
      method: 'POST',
      body: data,
      headers: {
    'x-auth-token': localStorage.getItem('token'),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const res1 = await response.json();
    console.log('Success:', res1);
   setFileList(res1);
    history('/File');
  } catch (error) {
    console.error('Error:', error.message);
    // Handle errors, such as showing an error message to the user
  }
};
return (
    <div>
      <Headers/>
       <div>
       <h1>Add Data</h1>  
       <form onSubmit={addfile} className="file-form"> 
      <input className="add" type="file" onChange={(event)=>
                          setFiledata(event.target.files[0])}  required/> <br/>
       <input className="add" label="Heading" placeholder="Heading" onChange={(event) => setHeading(event.target
        .value)}/><br/>
      <input className="add" label="Subheading" placeholder="Subheading" onChange={(event) => setSubheading(event.target
        .value)} /><br/>
      <input className="add" label="Description" placeholder="Description" onChange={(event) => setDescription(event.target
        .value)} /><br/>
      <button variant="contained" type="submit">Add file</button>
      </form>
     </div></div>
  );

}