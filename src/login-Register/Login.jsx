import React, { useState } from "react";
import Axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import "./login-signUp.css";

export default function Login(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
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

  async function submitLoginForm(e) {
    e.preventDefault(); //stop form reload
    setIsLoading(true); // work loading at the begin

    let validationResult = validateLoginForm(); // get validation from joi
    if (validationResult.error) 
    {
      //if found error >> put at error list
      setErrorList(validationResult.error.details);
      setIsLoading(false);
    } 
    else
     {
      //else >>send data to api
      let { data } = await Axios.post("https://route-egypt-api.herokuapp.com/signin",user);
      if (data.message === "success") {
        //if api validation has no error >>
        setIsLoading(false);
        localStorage.setItem('userToken',data.token);
        props.saveUserData(); //user token 
        navigate("/Home");
      }
       else
        {
        // else found >> show errors
        setIsLoading(false);
        setError(data.message);
      }
    }
  }
  function validateLoginForm() {
    let schema = Joi.object({email: Joi.string().email({minDomainSegments: 2,tlds: { allow: ["com", "net"] },}),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return schema.validate(user, { abortEarly: false });
  }
  return (
    <>
      <div className="m-auto w-75 py-5 ">
        <h2 className="mb-5">Login Now</h2>

        <form onSubmit={submitLoginForm}>
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
            className=" mt-2 mb-4 form-control"
          />

          {/*joi validation error*/}

          {/* {errorList.map((error) =>
            error.message.includes("pattern") ? (
              <div className="alert alert-danger py-2">Pass not vaild</div>
            ) : (
              <div className="alert alert-danger py-2">{error.message}</div>
            )
          )} */}
           {errorList.map((error) =>
            error.message.includes("password") ? (
              <div className="alert alert-danger py-2">{error.message}</div>
            ) : (
              ""
            )
          )}



          {/*API validation error*/}
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
              "Login"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
