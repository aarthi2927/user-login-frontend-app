import { useState } from 'react';
import {  useNavigate} from 'react-router-dom';

export function Movie({ name,poster, rating, starCast, summary,deleteButton,id }) {
  const styles = {
    color: rating > 8 ? "green" : "red",
  };
  const [show, setShow] = useState(true);
  const history= useNavigate();
  const summaryStyles = {
    display: show ? "block" : "none",
  };
  return (

    <div className="movie-container">
      <div >
      <img width="100%" height="350" src={poster} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>
          <div className='head'>
            <h2 className="movie-name">{name} 
           <p className="movie-summary" 
              style={summaryStyles}>{summary} <p className="movie-starcast" 
              style={summaryStyles}>{starCast} </p></p>
</h2>
            <p style={styles} className="movie-rating">⭐ {rating} </p>
          </div>
          <button  color="primary" onClick={()=>history(`/movie/${id}`)}> view more</button>
     {deleteButton}
      <button variant="outlined"  onClick={()=>history(`/movie/edit/${id}`)}>
      edit
      </button>
              </div>

    </div>
  );
}
