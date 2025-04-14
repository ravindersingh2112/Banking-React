import React, { useState } from "react";
import {Toaster, toast} from "sonner";
import Toast from "./Toast";
import Navbar from "./NavBar";

const Deposit = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseMessage, setResonseMessage] = useState("");
  const token = sessionStorage.getItem("token");
  const fetchUser = () => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:8080/user/details/${userId}`,{
      method:"GET",
      headers:{
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("User Does Not Exist");
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

  const handleUpdate = () => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:8080/user/deposit?id=${userId}&balance=${amount}`,{
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable To deposit ");
        }
        return response.json();
      })
      .then((data) => {
        setResonseMessage("Amount Deposited");
        
        toast.success("Amount Deposited");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  };
  return (
    <>  

      <Navbar/>
      <div className="content-center">
        <Toast/>
        <h2>Deposit Funds</h2>
        <input
          type="text"
          name="userId"
          value={userId}
          placeholder="Enter User Id"
          onChange={(e) => setUserId(e.target.value)}
        ></input>
        <button onClick={fetchUser}>Submit</button>
      </div>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {user && (
            <div>
                <input
                type="text"
                name="amount"
                value={amount}
                placeholder="Insert amount"
                onChange={(e)=>setAmount(e.target.value)}
                />

                <button onClick={handleUpdate}>Deposit</button>
                <div>
                    {error && <p>{error}</p>}
                    {responseMessage && <p>{responseMessage}</p>}
                </div>


            </div>
        )}
      </div>
    </>
  );
};

export default Deposit;
