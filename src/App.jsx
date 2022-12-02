 import React, { useEffect, useState } from "react";
import Home from "./Home";
import NavBar from "./Navbar";
import Movies from "./Movie";
import Login from "./login-Register/Login";
import Signup from "./login-Register/Signup";
import NotFound from "./NotFound";
import MovieDetails from './MovieDetails';

import { Routes, Route, Navigate ,  useNavigate } from "react-router-dom";
import Tv from "./Tv";
import jwtDecode from "jwt-decode";

export default function App() {
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();

  function saveUserData() {
    let encodesToken = localStorage.getItem('userToken');
    let decodedToken =jwtDecode(encodesToken);
    setUserData(decodedToken);
  }

//did mount >> for refresh
  useEffect(()=>
   {
      if(localStorage.getItem('userToken')){
      saveUserData() 
   }
   },[])


  function ProtectedRoute(props)
  {
    if(localStorage.getItem('userToken') === null)
    {
      return <Navigate to='/login' />
    } 
    else {
          //navigate to destination
         return props.children
    }
  }

//logout
   function logOut()
   {
    setUserData(null);
    localStorage.removeItem('userToken');
    navigate("/Login");
   }

  return (
    <>
  
      <NavBar logOut={logOut} userData={userData} />
      <div className=" container py-4">
        <Routes>
          <Route path="/" element={ <ProtectedRoute><Home/></ProtectedRoute> } />
          <Route path="home" element={<ProtectedRoute> <Home /></ProtectedRoute> } />
          <Route path="movies" element={ <ProtectedRoute><Movies/></ProtectedRoute> } />
          <Route path="movieDetails" element={<ProtectedRoute><MovieDetails /> </ProtectedRoute> } >
             <Route path=":id" element={<ProtectedRoute><MovieDetails /> </ProtectedRoute> } />
          </Route>
          <Route path="tv" element={ <ProtectedRoute> <Tv /> </ProtectedRoute>} />
          <Route path="login" element={ <Login saveUserData={saveUserData} />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
