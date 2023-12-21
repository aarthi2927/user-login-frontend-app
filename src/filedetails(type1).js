//add
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { mockapi } from './mockapi';
export function AddFile({filelist,setFileList}) {
  //const [movielist,setMovieList]=useState([]);
  const [heading, setHeading] = useState(" ");
  const [filedata, setFiledata] = useState("");
  const [description, setDescription] = useState("");
  const [subheading, setSubheading] = useState("");
  const history=useNavigate();

const addfile=()=>{
   const newFile = {
    filedata:filedata,
    heading:heading,
   subheading:subheading,
   description: description,
    };
    fetch(`${mockapi}/files/add`,
    {method:"POST",
  body:JSON.stringify(newFile),
headers:{"Content-type":"application/json",
  "x-auth-token": localStorage.getItem("token"),
   }
  })
.then(()=>history('/file'));
setFileList([...filelist,newFile])
  }

  return (
    <div className="add-movie-form">
      <input label="Movie Name" placeholder="name" type="file" onChange={(event) => setFiledata(event.target
        .value)} />
      <input label="Movie poster" placeholder=" poster" onChange={(event) => setHeading(event.target
        .value)} />
      <input label="Movie rating" placeholder=" rating" onChange={(event) => setSubheading(event.target
        .value)} />
      <input label="Movie starCast" placeholder="starCast" onChange={(event) => setDescription(event.target
        .value)} />
      <button variant="contained" onClick={addfile}>Add movie</button>
    </div>
  );

}

//method 2 addfile

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { mockapi } from './mockapi';
export function AddFile({filelist,setFileList}) {
  //const [movielist,setMovieList]=useState([]);
  const [heading, setHeading] = useState(" ");
  const [filedata, setFiledata] = useState("");
  const [description, setDescription] = useState("");
  const [subheading, setSubheading] = useState("");
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

    const responseData = await response.json();
    console.log('Success:', responseData);
    history('/File');
  } catch (error) {
    console.error('Error:', error.message);
    // Handle errors, such as showing an error message to the user
  }
};
 
  return (
    <div className="add-movie-form">
      <form onSubmit={addfile}> 
      <input type="file" onChange={(event)=>
                          setFiledata(event.target.files[0])} className="upload-box-input" required/>
      <input label="Movie poster" placeholder=" poster" onChange={(event) => setHeading(event.target
        .value)} />
      <input label="Movie rating" placeholder=" rating" onChange={(event) => setSubheading(event.target
        .value)} />
      <input label="Movie starCast" placeholder="starCast" onChange={(event) => setDescription(event.target
        .value)} />
      <button variant="contained" type="submit">Add movie</button>
      </form> </div>
  );

}

//view
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { mockapi } from './mockapi';
export function FileDetails() {
  const {id} = useParams();
  console.log(id);
const [filedata1, setFiledata1] = useState({});
const viewfile=()=>{
  fetch(`${mockapi}/files/${id}`,
   {
     method:"GET",
     headers: {
       "x-auth-token": localStorage.getItem("token"),
        },
   })
   .then((data)=>data.json())
   .then((mvs)=>setFiledata1(mvs))
   .catch((err)=>console.log(err));
   }
 useEffect(()=>viewfile(),[id])
 console.log(filedata1);


return (
  <div>
 <div className="viewdata">
<p>{filedata1.heading}</p>

    </div>
  </div>
)
}
//method 1
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { mockapi } from './mockapi';
export function FileDetails() {
  const history=useNavigate();
 
  const{id}=useParams();
 const [filedata1, setFiledata1] = useState([]);
  useEffect(() => {
     dataviewid();
  }, [id]);
  const dataviewid = async () => {
    try {
      const response = await fetch(`${mockapi}/files/${id}`, {
        method:'GET',
        headers: {
          'x-auth-token': localStorage.getItem('token'),
          "Access-Content-Type": "application/json",
          "Access-Control-Allow-Methods": "GET" ,
        },
       
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const mydata = data;
      setFiledata1(mydata);

            } catch (err) {
      console.error('Error:', err);
    }
  };
  console.log(filedata1)
return (
  <div>
 <div className="viewdata">
<h1>{filedata1.heading}</h1>

<img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:8000/${filedata1.filedata}`} />
<button onClick={()=>{ history('/File');}}>Back</button>
    </div>
  </div>
)
}
