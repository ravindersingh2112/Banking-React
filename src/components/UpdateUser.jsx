import React, { useState } from "react";
import Toast from "./Toast";
import {Toaster, toast} from "sonner";
import Navbar from "./NavBar";
const UpdateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    balance: "",
    phoneNumber: "",
  });

  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("token");
  const fetchUser = () => {
    setLoading(true);
    setError(false);
    
    fetch(`http://localhost:8080/user/details/${userId}`,{
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("User Does not exists");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
       
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setUser(null);
        setLoading(false);
        toast.warning(error.message);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/user/update/${userId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed To update User");
        }
        return response.json();
      })
      .then((data) => {
        setResponseMessage("Updated SuccessFully");
        setFormData({
          name: "",
          balance: "",
          phoneNumber: "",
        });
        toast.success("Updated Successfully")
      })
      .catch((error) => {
        console.error(error);
        setResponseMessage("Error Updating User");
        toast.warning(error.message);
      });
  };

  return (
    <>
    <Navbar/>
    <div className="content-center">    
      <Toast/>
      <h1>Update User details</h1>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter UserId"
      />

      <button onClick={fetchUser}>Fetch User</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {user && (
        <div>
          <form onSubmit={handleSubmit}>
            <label>Name :</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
              required
            ></input>
            <br></br>
            <label>Balance :</label>{" "}
            <input
              type="text"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              placeholder="Enter Balance"
              required
            ></input>
            <br></br>
            <label>Phone Number :</label>{" "}
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              required
            ></input>
            <br></br>
            <br></br>
            <button type="submit">Update User</button>
            {error && <p>{error}</p>}
            {responseMessage && <p>{responseMessage}</p>}
          </form>
        </div>
      )}
      
</div>
    </>
  );
};

export default UpdateUser;
