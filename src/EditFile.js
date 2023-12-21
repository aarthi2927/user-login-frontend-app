import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockapi } from './mockapi';
import Headers from './Header';
export function EditFile({filelist,setFileList}) {
   const history=useNavigate();
   const {id}=useParams();
   console.log(id,filelist);
   const [file,setFile]=useState();
   const editfile=()=>{
   fetch(`${mockapi}/files/${id}`,
    {
      method:"GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
         },
    })
    .then((data)=>data.json())
    .then((mvs)=>setFile(mvs))
    .catch((err)=>console.log(err));
    }
     useEffect(()=>editfile(),[id])
     console.log(file);

     const handleEdit = async (fileData) => {
      try {
        const response = await fetch(`${mockapi}/files/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token'),
          },
          body: JSON.stringify(fileData),
        });
  
        if (response.ok) {
          console.log('File updated successfully');
          history('/file');
        } else {
          console.error('Failed to update file');
        }
      } catch (error) {
        console.error('Error updating file:', error);
      }
    };
return(
  <div>
       { file ? <EditFileForm file={file} handleEdit={handleEdit}/>:<h2>Loading</h2>
      }      </div>
          );


}

export function EditFileForm({file,handleEdit}){
  const history=useNavigate();
  const [filedata, setFiledata] = useState(file.filedata);
  const [heading, setHeading] = useState(file.heading);
  const [subheading, setSubheading] = useState(file.subheading);
  const [description, setDescription] = useState(file.description);
  
  const editFile=async(e)=>{ 
    e.preventDefault();
   /*const formData = new FormData();
    formData.append('filedata', filedata);
    formData.append('heading', heading);
    formData.append('subheading', subheading);
    formData.append('description', description);
     
     
    await fetch(`${mockapi}/files/${file._id}`,
    {method:"PUT",
    body:formData,
    headers:{
  "x-auth-token": localStorage.getItem("token")},
  })
  .then((updateData) => {
    console.log("Update Data from Server:", updateData);
    history("/file");
  })
    .catch((err)=>console.log(err));
  } */
  const fileData = {
    filedata,
    heading,
    subheading,
    description,
  };
  handleEdit(fileData);
};

     
return (
  <div><Headers/>
  <div className="add-file-form">
    <h1>Edit Data</h1>    
    <input  className="add" label="filedata" type="file" 
     onChange={(event)=>setFiledata([...event.target.files])} />
    <input  className="add" label="heading" placeholder="heading" 
    onChange={(event) => setHeading(event.target.value)} value={heading}/>
    <input  className="add" label="subheading" placeholder="subheading" onChange={(event)=> setSubheading(event.target
      .value)} value={subheading}/>
    <input className="add" label="description" placeholder="description" onChange={(event)=> setDescription(event.target
      .value)} value={description}/>
       <button variant="contained" onClick={editFile}>save</button>
  </div></div>
);
}