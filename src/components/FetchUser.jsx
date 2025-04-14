import React, { useState, useEffect } from "react";
import {Toaster, toast} from "sonner";
import Navbar from "./NavBar";


const FetchUser = () => {
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = () => {
    const token = sessionStorage.getItem("token");
    setLoading(true);
    setError(null);

    fetch(`http://localhost:8080/user/details/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("User Not Found");
        }
        return response.json();
      })
      .then((user) => {
        setUsers(user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error.message);
        setUsers(null);
        setLoading(false);
        toast.warning(error.message);
      });
  };

  return (
    <>
    <Navbar></Navbar>
      <Toaster />
      <div className="content-center" >
      <p>Fetch User Details</p>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter UserId"
      />

      <button onClick={fetchUser}>Fetch User</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {users && (
        <div>
          <p>User Id: {users.id}</p>
          <p>User Name: {users.name}</p>
          <p>Balance: {users.balance}</p>
          <p>Phone Number: {users.phoneNumber}</p>
        </div>
      )}
      </div>
    </>
  );
};

export default FetchUser;