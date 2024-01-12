import { useState } from 'react';
import './App.css';
import {  useNavigate} from 'react-router-dom';
export function File({ heading,filedata,description,subheading,deleteButton,id }) {
  const history= useNavigate();
  return (
    <tbody >
    <tr key={id}>
        <td className="link_url" onClick={()=>{history(`/file/${id}`)}}>{heading}</td>
       <td>{subheading}</td>
       <td>{description}</td>
       <td>
     {deleteButton}</td>
     <td>
    <button className="button_modify" variant="outlined"  onClick={()=>history(`/file/edit/${id}`)}>
      edit
      </button></td>
       </tr>
         </tbody>
    
  );
}

/*
  const styles = {
    color: rating > 8 ? "green" : "red",
  };
  const [show, setShow] = useState(true);

  const summaryStyles = {
    display: show ? "block" : "none",
  };

*/