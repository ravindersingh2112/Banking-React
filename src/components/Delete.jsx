import React, { useState } from "react";
import Navbar from "./NavBar";
import { toast } from "sonner";
import Toast from "./Toast";

const Delete = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("token");

  

  const fetchUser = () => {
    setLoading(true);
    setError(false);

    fetch(`http://localhost:8080/user/details/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/user/delete/${userId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed To delete User");
        }
        return response.text();
      })
      .then((data) => {
        setResponseMessage("Deleted SuccessFully");
        toast.success("Deleted Successfully")
      })
      .catch((error) => {
        console.error(error);
        setResponseMessage("Error Deleting User");
        toast.warning(error.message);
      });
  };

  return(
    <>
    <Toast />
        <Navbar/>
    <div className="content-center">    
      
      <h1>Delete Account</h1>
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
            <button type="submit" onClick={handleSubmit}>Delete User</button>
            {error && <p>{error}</p>}
            {responseMessage && <p>{responseMessage}</p>}
          
        </div>
      )}
      
</div>
    
    </>
  );

};

export default Delete;
