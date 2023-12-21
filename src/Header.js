import { useNavigate} from 'react-router-dom';
import './App.css';
export default function Headers({user}){
    const history = useNavigate();
    const token =localStorage.getItem('token');
     const logoutuser = ()=>{
      localStorage.clear();
      history('/login')
    }
      return(
        <div className='menu'>
         <div className='menu_left'><h1>File Mangement</h1></div>
<div className='menu_right'>
      {token ?
        <ul>
        <li className="afterlogin" onClick={()=>history('/file')}>Home</li>
        <li className="afterlogin" onClick={()=>history('/file/add')}>Add</li>
        <li className="afterlogin" onClick={()=>history('/userprofile')}>Profile</li>
        <li className="afterlogin" onClick={logoutuser}>logout</li>
        </ul>
      :
        <ul >
        <li onClick={()=>history('/login')}>Login</li>
        <li onClick={()=>history('/register')}>Register</li>
        </ul>
      }
      </div></div>
        
    )
}