import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function MovieDetails() {
  let params = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  let apiKey = "b7ed3ef8d2fddd67928ca17512db61f4";
  let imgpath = "https://image.tmdb.org/t/p/w500";

  async function getMovieDetails(id) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
      setMovieDetails(data);
    
  }

  //component did mount
  useEffect(() => {
    getMovieDetails(params.id);
  }, []);

  return <div>{movieDetails?
  <div className="row">
    <div className="col-md-4">
      <img src={imgpath + movieDetails.poster_path } alt="" className="w-100" />
    </div>
    <div className="col-md-6">
      <h2>{movieDetails.original_title}</h2>
      <p className=" text-muted py-3">{movieDetails.overview}</p>
      <ul className=" list-unstyled">
        <li className="mb-1">Budget : {movieDetails.budget}</li>
        <li className="mb-1">Rate : {movieDetails.vote_average.toFixed(1)}</li>
        <li className="mb-1">Vote Count : {movieDetails.vote_count}</li>

      </ul>
    </div>
  </div>
  :<div className="vh-100 d-flex justify-content-center align-items-center">
    <i className="fas fa-spinner fa-spin fa-3x"></i>
    </div>}
    </div>;
}
