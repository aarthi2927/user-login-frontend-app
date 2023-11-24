import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { mockapi } from './mockapi';
export function MovieDetails() {
  const {_id} = useParams();
  console.log(_id);
  const nav=useNavigate();
  const [movie,setMovie]=useState({});
  useEffect(()=>{
    fetch(`${mockapi}/movies/${_id}`,{
      method:"GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
         },
    })
    .then((data)=>data.json())
    .then((mvs)=>setMovie(mvs))
    .catch((err)=>console.log(err));
  },[]);
  return (
    <div>
        <div class="movie-detail-container">
        <div class="movie-space">
         <br/>
          <img width="100%" height="750" src={movie.poster} title="YouTube video player"  allowfullscreen/>
          <h3>{movie.name}</h3>
          <h3>{movie.rating}</h3>
        </div>
        <p>{movie.starCast}</p>
        <p>{movie.summary}</p>
        <br/>
        <button variant="outlined"  onClick={()=>nav('/movie')}>
      Back
      </button>
   
      </div>
    </div>

  );

}
