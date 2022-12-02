import React from 'react'
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar(props) {
  return (
    <>
     <nav className="navbar navbar-expand-lg pt-3  bg-transparent navbar-dark ">
  <div className="container">
    <Link className="navbar-brand" to="Home">Noxa</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {props.userData?<><li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="Home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Tv">Tv</Link>
        </li>
         </>  :""}
        
      </ul>
      <ul className="navbar-nav  mb-2 mb-lg-0">
        {props.userData?<> 
        <form className="d-flex">
           <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        </form>
        <li className="nav-item">
          <span onClick={props.logOut} className="nav-link"  >Logout</span>
        </li></> : <>
        <li className="nav-item">
          <Link className="nav-link" to="Login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Signup">Register</Link>
        </li></>}
     
       
       
      </ul>
      
    </div>
  </div>
</nav>
  
    </>
  )
}
