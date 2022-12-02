import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import avatar from "./profileavatar.png";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);

  let apiKey = "b7ed3ef8d2fddd67928ca17512db61f4";
  let imgpath = "https://image.tmdb.org/t/p/w500";

  async function getTrending(mediaType, callBack) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${apiKey}`
    );
    callBack(data.results.slice(0, 10));
  }

  //component did mount
  useEffect(() => {
    getTrending("movie", setTrendingMovies);
    getTrending("tv", setTrendingTv);
    getTrending("person", setTrendingPeople);
  }, []);

  return (
    <>
      {/* trending movies*/}
      <div className="row">
        <div className="col-md-4 d-flex align-items-center">
          <div className="title">
            <div className="brdr w-50 mb-4"> </div>
            <h2 className="mb-3">
              Trending <br />
              Movies <br /> To Watch Right Now{" "}
            </h2>
            <p className=" text-muted">Most watched movies by days</p>
            <div className="brdr mt-4  mb-4 mb-lg-0"> </div>
          </div>
        </div>
        {trendingMovies.map((movie, i) => (
          <div key={i} className="single-movie col-md-4 col-lg-2 ">
            <Link to={`/movieDetails/${movie.id}`}>
              <div className="img-container px-1 position-relative">
                <img
                  src={imgpath + movie.poster_path}
                  className="img-fluid"
                  alt=""
                />
                {/* <span className=' bg-info position-absolute  end-0 p-1' > {Math.floor(movie.vote_average)} </span> */}
                <span className=" bg-info position-absolute  end-0 p-1">
                  {" "}
                  {movie.vote_average.toFixed(1)}{" "}
                </span>
              </div>
              <h3 className="h6 fw-normal mt-2 mb-4">{movie.title}</h3>
            </Link>
          </div>
        ))}
      </div>

      {/* trending tv*/}

      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div className="title">
            <div className="brdr w-50 mb-4 "> </div>
            <h2 className="mb-3">
              Trending <br />
              Tv <br /> To Watch Right Now{" "}
            </h2>
            <p className=" text-muted">Most watched Tv by days</p>
            <div className="brdr mt-4  mb-4 mb-lg-0"> </div>
          </div>
        </div>
        {trendingTv.map((tv, i) => (
          <div key={i} className="single-movie  col-md-4 col-lg-2 ">
            <div className="img-container px-1 position-relative">
              <img
                src={imgpath + tv.poster_path}
                className="img-fluid"
                alt=""
              />
              {/* <span className=' bg-info position-absolute  end-0 p-1' > {Math.floor(movie.vote_average)} </span> */}
              <span className=" bg-info position-absolute  end-0 p-1">
                {" "}
                {tv.vote_average.toFixed(1)}{" "}
              </span>
            </div>
            <h3 className="h6 fw-normal mt-2 mb-4">{tv.name}</h3>
          </div>
        ))}
      </div>

      {/* trending people*/}
      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div className="title">
            <div className="brdr w-50 mb-4 "> </div>
            <h2 className="mb-3">
              Trending <br />
              People <br /> To Watch Right Now{" "}
            </h2>
            <p className=" text-muted">Most watched people by days</p>
            <div className="brdr mt-4 mb-4 mb-lg-0"> </div>
          </div>
        </div>
        {trendingPeople.map((people, i) => (
          <div key={i} className="single-movie  col-md-4 col-lg-2">
            <div className="img-container px-1 position-relative">
              {people.profile_path === null ? (
                <img src={avatar} className="img-fluid" alt="" />
              ) : (
                <img
                  src={imgpath + people.profile_path}
                  className="img-fluid"
                  alt=""
                />
              )}
            </div>
            <h3 className="h6 fw-normal mt-2 mb-4">{people.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
