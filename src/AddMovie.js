import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { mockapi } from './mockapi';
export function AddMovie({movielist,setMovieList}) {
  //const [movielist,setMovieList]=useState([]);
  const [name, setName] = useState(" ");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");
  const [summary, setSummary] = useState("");
  const [starCast, setStarCast] = useState("");
  const history=useNavigate();
// 1. method must be POST
// 2. body - JSON data
// 3. headers - JSON data
// After POST is complete -> movie to /moviesfetch

  const addmovie=()=>{
   const newMovie = {
      name: name,
      poster: poster,
      summary: summary,
      starCast: starCast,
      rating: rating
    };
    fetch(`${mockapi}/movies/add`,
    {method:"POST",
  body:JSON.stringify(newMovie),
headers:{"Content-type":"application/json",
  "x-auth-token": localStorage.getItem("token"),
   }
  })
.then(()=>history('/movie'));
setMovieList([...movielist,newMovie])
  }

  return (
    <div className="add-movie-form">
      <input label="Movie Name" placeholder="name" type="text" onChange={(event) => setName(event.target
        .value)} />
      <input label="Movie poster" placeholder=" poster" onChange={(event) => setPoster(event.target
        .value)} />
      <input label="Movie rating" placeholder=" rating" onChange={(event) => setRating(event.target
        .value)} />
      <input label="Movie starCast" placeholder="starCast" onChange={(event) => setStarCast(event.target
        .value)} />
      <input label="Movie summary" placeholder=" summary" onChange={(event) => setSummary(event.target
        .value)} />
      <button variant="contained" onClick={addmovie}>Add movie</button>
    </div>
  );

}
