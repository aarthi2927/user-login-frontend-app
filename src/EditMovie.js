import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockapi } from './mockapi';
export function EditMovie({movielist,setMovieList}) {
    const history=useNavigate();
    //const [movielist,setMovieList]=useState([]);
    const {_id}=useParams();
    console.log(_id,movielist);
   const [movie,setMovie]=useState();
   const editmoive=()=>{
       //1. method must be PUT & pass id// 2. body - JSON data// 3. headers - JSON data
      // After PUT is complete -> movie to /movies
    fetch(`${mockapi}/movies/${_id}`,
    {
      method:"GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
         },
    }
    )
    .then((data)=>data.json())
    .then((mvs)=>setMovie(mvs))
    .catch((err)=>console.log(err));
    }
     useEffect(()=>editmoive(),[])
     console.log(movie);
return(
  <div>
       { movie ? <EditMovieForm movie={movie}/>:<h2>Loading</h2>
      }      </div>
          );


}

export function EditMovieForm({movie}){
  const history=useNavigate();
  const [name, setName] = useState(movie.name);
  const [poster, setPoster] = useState(movie.poster);
  const [rating, setRating] = useState(movie.rating);
  const [summary, setSummary] = useState(movie.summary);
  const [starCast, setStarCast] = useState(movie.starCast);
  const editMovie=()=>{ 
    const movieupdate = {
      name: name,
      poster: poster,
      summary: summary,
      starCast: starCast,
      rating: rating
    };
    fetch(`${mockapi}/movies/${movie._id}`,
    {method:"PUT",
    body:JSON.stringify(movieupdate),
    headers:{"Content-type":"application/json",
  "x-auth-token": localStorage.getItem("token")}
  }).then(()=>history("/movie"));
  
  }
return (
  <div className="add-movie-form">
    <input label="Movie Name" placeholder="name" type="text"
     onChange={(event) => setName(event.target.value)} value={name}/>
    <input label="Movie poster" placeholder=" poster" onChange={(event) => setPoster(event.target
      .value)} value={poster}/>
    <input label="Movie rating" placeholder=" rating" onChange={(event) => setRating(event.target
      .value)} value={rating}/>
    <input label="Movie starCast" placeholder="starCast" onChange={(event) => setStarCast(event.target
      .value)} value={starCast}/>
    <input label="Movie summary" placeholder=" summary" onChange={(event) => setSummary(event.target
      .value)} value={summary}/>
    <button variant="contained" onClick={()=>editMovie()}>save</button>
  </div>
);
}