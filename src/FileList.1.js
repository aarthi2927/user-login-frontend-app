import { File } from './File';
import {useState,useEffect} from 'react';
import { mockapi } from './mockapi';
import { Tablehead } from './Tablehead';
import './App.css';
import Headers from './Header';
export function FileList({filelist,setFileList}) {

  const getFiles=()=>{
    {fetch(`${mockapi}/files/view`,{
      method:"GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
         },
   
    })
    .then((data)=>data.json())
    .then((mvs)=>setFileList(mvs))}
  }
  useEffect(()=>getFiles(),[]);
  const deleteFile=(_id)=>{fetch(`${mockapi}/files/${_id}`,{
    method:"DELETE",
    headers: {
      "x-auth-token": localStorage.getItem("token"),
       },
  }).then(()=>getFiles());
  
};
  return (
    <div className='content'>
      <Headers/>
      <div className='homepage'>
      <div className='homepageleft'>hi all</div>
      <div className='homepageright'>
      <Tablehead/>
      {filelist.map(({heading,filedata,description,subheading,deleteButton,_id }, index) => (
        <File key={index}  heading={heading} filedata={filedata} description={description}
        subheading={subheading}
        deleteButton={<button className="button_modify" color="error" onClick={()=>deleteFile(_id)}>
   delete
    </button>} 
    id={_id}
    />
          ))}
      
    </div></div></div>  
  );
}

