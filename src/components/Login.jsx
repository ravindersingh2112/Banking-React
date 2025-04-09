import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToken("");
    setErrorMsg("");

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        const text = await response.text();

        if(!response.ok){
            throw new Error(text);
        }
        return {token:text};

      })
      .then((data) => {
        setToken(data.token);
        sessionStorage.setItem("token", data.token);
        setFormData({username:"",password:""})
        window.location.href = "/home";
      })
      .catch((error) => {
        setErrorMsg(error.message || "Login Failed");
      });
  }

  return(
    <>
    <h2>Login</h2>

    <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
        placeholder="Enter Username"
        ></input>
        <br/><br/>


        <label>Password</label>
        <input
        type="password"
        name="password" 
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="Enter Password"
        ></input>
        <br/><br/>

        <button type="submit">Login</button>
    </form>
    <br/>
   <div>
    Dont have an account? <Link to="/signup">Signup</Link>
   </div>
    </>
  )

};

export default Login;
