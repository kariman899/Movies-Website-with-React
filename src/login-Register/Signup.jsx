import React, { useState } from "react";
import Axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import "./login-signUp.css";

export default function Signup() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: 0,
  });
  const [error, setError] = useState("");
  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();


  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function submitRegisterForm(e) {
    e.preventDefault(); //stop form reload
    setIsLoading(true); // work loading at the begin

    let validationResult = validateRegisterForm(); // get validation from joi
    if (validationResult.error) {
      //if found error >> put at error list
      setErrorList(validationResult.error.details);
      setIsLoading(false);
    } else {
      //else >>send data to api
      let {data} = await Axios.post("https://route-egypt-api.herokuapp.com/signup",user);
      if (data.message === "success") {
        //if api validation has no error >>
        setIsLoading(false);
        navigate("/Login");
      } else {
        // else found >> show errors
        setIsLoading(false);
        setError(data.message);
      }
    }
  }


  function validateRegisterForm() {
    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(30).required(),
      last_name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email({minDomainSegments: 2,tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      age: Joi.number().min(16).max(80).required(),
    });
    return schema.validate(user, { abortEarly: false });
  }

  
  return (
    <>
      <div className="m-auto w-75 py-5 register ">
        <h2 className="mb-5">Register Now</h2>

        <form onSubmit={submitRegisterForm}>
          <label htmlFor="first_name">First Name</label>
          <input
            onChange={getUserData}
            type="text"
            name="first_name"
            id="first_name"
            className=" mt-2 mb-3 form-control"
          />
          {errorList.map((error) =>
            error.message.includes("first_name") ? (
              <div className="alert alert-danger py-2">{error.message}</div>
            ) : (
              ""
            )
          )}

          <label htmlFor="last_name">Last Name</label>
          <input
            onChange={getUserData}
            type="text"
            name="last_name"
            id="last_name"
            className=" mt-2 mb-3 form-control"
          />
         
          {errorList.map((error) =>
            error.message.includes("last_name") ? (
              <div className="alert alert-danger py-2">{error.message}</div>
            ) : (
              ""
            )
          )}

          <label htmlFor="email">E-mail</label>
          <input
            onChange={getUserData}
            type="email"
            name="email"
            id="email"
            className=" mt-2 mb-3 form-control"
          />
          {errorList.map((error) =>
            error.message.includes("email") ? (
              <div className="alert alert-danger py-2">{error.message}</div>
            ) : (
              ""
            )
          )}


          <label htmlFor="password">Password</label>
          <input
            onChange={getUserData}
            type="password"
            name="password"
            id="password"
            className=" mt-2 mb-3 form-control"
          />
          {errorList.map((error) =>
            error.message.includes("password") ? (
              <div className="alert alert-danger py-2">{error.message}</div>
            ) : (
              ""
            )
          )}


          <label htmlFor="age">Age</label>
          <input
            onChange={getUserData}
            type="number"
            name="age"
            id="age"
            className=" mt-2 mb-3 form-control"
          />
            {errorList.map((error) =>
            error.message.includes("age") ? (
              <div className="alert alert-danger py-2">{error.message}</div>
            ) : (
              ""
            )
          )}

          {/** API error messgae */}
          {error.length > 0 ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            ""
          )}
     
          <button type="submit" className=" btn btn-info text-white ">
            {" "}
            {isLoading === true ? (
              <i className="fas fa-spinner fa-spin "></i>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
