import './App.css';
import {useState} from 'react';
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { FileList } from './FileList.1';
import { FileDetails } from './FileDetails';
import { AddFile} from './AddFile';
import { EditFile } from './EditFile';
import Login from './login';
import Register from './register';
import ProtectedRoute from './ProtectedRoute';
import Headers from './Header';
import UserProfile from './userProfile';
import {Editprofile} from './editprofile';
function App() {
    const [filelist,setFileList]=useState([]);
    const [user, setUser] = useState(null);
    return (
      <div className="App">
      <Routes>
         <Route path='/file/:id' element={<ProtectedRoute><FileDetails filelist={filelist} setFileList={setFileList}/></ProtectedRoute>}/>
         <Route path='/file/add' element={<ProtectedRoute><AddFile filelist={filelist} setFileList={setFileList}/></ProtectedRoute>}/>
         <Route path='/file/edit/:id' element={<ProtectedRoute><EditFile filelist={filelist} setFileList={setFileList}/></ProtectedRoute>}/>
          <Route path='/file' element={<ProtectedRoute><FileList filelist={filelist} setFileList={setFileList}/> </ProtectedRoute>}/>
          <Route path='/userprofile/edit' element={<ProtectedRoute><Editprofile/></ProtectedRoute>}/>
          <Route path='/userprofile' element={<ProtectedRoute><UserProfile/></ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
           </Routes>
              </div>
    );
     }
    export default App;