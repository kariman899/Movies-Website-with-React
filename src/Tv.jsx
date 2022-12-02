import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";


export default function Movie() {
  let nums = new Array(13).fill(1).map((element, index) => index + 1);
  const [trendingTv, setTrendingTv] = useState([]);
  let apiKey = "b7ed3ef8d2fddd67928ca17512db61f4";
  let imgpath = "https://image.tmdb.org/t/p/w500";
  async function getTrending(pageNumber) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`
    );
    setTrendingTv(data.results);
  }

  //component did mount
  useEffect(() => {
    getTrending(2);
  }, []);
  return (
    <>
      {trendingTv ? (
        <div className="row justify-content-center ">
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
          <nav aria-label="...">
            <ul className="pagination pagination-md d-flex justify-content-center">
              {nums.map((pageNum) => (
                <li
                  onClick={() => getTrending(pageNum)}
                  key={pageNum}
                  className="page-item pag-hover "
                  aria-current="page"
                >
                  <a className="page-link bg-transparent   " >
                    {pageNum}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
        </div>
      )}
    </>
    // <div>movie</div>
  );
}
