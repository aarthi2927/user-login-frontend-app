import './App.css';
import {useState} from 'react';
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { MovieList } from './MovieList.1';
import { MovieDetails } from './MovieDetails';
import { AddMovie } from './AddMovie';
import { EditMovie } from './EditMovie';
import Login from './login';
import Register from './register';
import ProtectedRoute from './ProtectedRoute';
import Headers from './Header';
import UserProfile from './userProfile';
import {Editprofile} from './editprofile';

function App() {
    const [movielist,setMovieList]=useState([]);
    const [user, setUser] = useState(null);
    return (
      <div className="App">
        <Headers />
        <Routes>
         <Route path='/movie/:_id' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}/>
         <Route path='/movie/add' element={<ProtectedRoute><AddMovie movielist={movielist} setMovieList={setMovieList}/></ProtectedRoute>}/>
         <Route path='/movie/edit/:_id' element={<ProtectedRoute><EditMovie movielist={movielist} setMovieList={setMovieList}/></ProtectedRoute>}/>
          <Route path='/movie' element={<ProtectedRoute><MovieList movielist={movielist} setMovieList={setMovieList}/> </ProtectedRoute>}/>
          <Route path='/userprofile/edit' element={<ProtectedRoute><Editprofile/></ProtectedRoute>}/>
          <Route path='/userprofile' element={<ProtectedRoute><UserProfile/></ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
           </Routes>
              </div>
    );
     }
    export default App;