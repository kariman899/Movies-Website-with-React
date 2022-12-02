import { createContext } from "react";
import axios from "axios";
import React, { useState , useEffect } from "react";

export let moviesContext = createContext(0)
export function MoviesContextProvider(props)
{
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTv, setTrendingTv] = useState([]);
  
    let apiKey = "b7ed3ef8d2fddd67928ca17512db61f4";
    async function getTrending(pageNumber,mediaType, callBack) {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`
      );
      callBack(data.results);
    }
  
    //component did mount
    useEffect(() => {
      getTrending(2,"movie", setTrendingMovies);
      getTrending(2,"tv", setTrendingTv);  }, []);
    return <moviesContext.Provider value={{trendingMovies,trendingTv}}>
        {props.children}
    </moviesContext.Provider>
}