import react, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    const[formData,setFormData]=useState({
        username:"",
        password:"",
        role:""
    });

    const [message, setMessage] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        setErrorMsg("");
        setMessage("");

        fetch("http://localhost:8080/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          })
            .then(async (response) => {
              const bodyText = await response.text(); // read ONCE
          
              if (!response.ok) {
                throw new Error(bodyText);
              }
          
              try {
                const data = JSON.parse(bodyText); // manually parse
                return data;
              } catch (err) {
                return {message:bodyText}
              }
            })
            .then((data) => {
              setMessage(data.message || "Signup successfully");
              setFormData({
                username: "",
                password: "",
                role: ""
              });
            })
            .catch((error) => {
              setErrorMsg(error.message || "Signup Failed");
            });
        
    }


      return(
        <>
        <div className="content-center">
        <h2>Sign up</h2>

        <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Enter Username"
        required></input>
        <br></br>
        <br></br>
        <label htmlFor="password">Password</label>   
        <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter Password"
        required
        ></input>   
        <br></br>
        <br></br>
        <label>Roles</label>
        <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required>
            <option value="">--Select--</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
        </select>
        <br></br>
        <br></br>
        <button type="submit">SignUp</button>
        </form>

        <div>
            {
                message && (
                    <div>
                        {message}
                    </div>
                )
            }
            </div> 
        <div>
            {
                errorMsg &&
                <div>
                    Error:{errorMsg}
                </div>
            }
        </div>
        <br/>

        <div>
            Already an user? <Link to="/" >Login</Link>
                    </div>
            </div>
        </>
      )
};


export default Signup;