import { useNavigate} from 'react-router-dom';
export default function Headers({user}){
    const history = useNavigate();
    const token =localStorage.getItem('token');
     const logoutuser = ()=>{
      localStorage.clear();
      history('/login')
    }
      return(
        <div>
      {token ?
        <div>
            <button onClick={()=>history('/movie')}>Home</button>
        <button onClick={()=>history('/movie/add')}>Add</button>
        <button onClick={()=>history('/userprofile')}>Profile</button>
        <button onClick={logoutuser}>logout</button>
        </div>
               :
        <div>
        <button onClick={()=>history('/login')}>Login</button>
        <button onClick={()=>history('/register')}>Register</button>
        </div>
      }
      </div>
        
    )
}