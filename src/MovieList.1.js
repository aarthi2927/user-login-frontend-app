import { Movie } from './Movie';
import {useState,useEffect} from 'react';
import { mockapi } from './mockapi';

export function MovieList({movielist,setMovieList}) {
  //const [movielist,setMovieList]=useState([]);
  const getMovies=()=>{
    {fetch(`${mockapi}/movies/view`,{
      method:"GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
         },
   
    })
    .then((data)=>data.json())
    .then((mvs)=>setMovieList(mvs))}
  }
  useEffect(()=>getMovies(),[]);
  const deleteMovie=(_id)=>{fetch(`${mockapi}/movies/${_id}`,{
    method:"DELETE",
    headers: {
      "x-auth-token": localStorage.getItem("token"),
       },
  }).then(()=>getMovies());
  
};
  return (
    <div className="movie-list">
      {movielist.map(({ name, poster, starCast, rating, summary,_id }, index) => (
        <Movie key={index} name={name} poster={poster} starCast={starCast}
          rating={rating} summary={summary}
          deleteButton={<button aria-label="delete" color="error" onClick={()=>deleteMovie(_id)}>
   delete
    </button>} 
    id={_id}
    />
          ))}
      
    </div>
  );
}

