import React, { useState } from "react";
import {Toaster, toast} from "sonner";
import Toast from "./Toast";
import Navbar from "./NavBar";
const Withdrawl = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const token = sessionStorage.getItem("token");
  const fetchUser = () => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:8080/user/details/${userId}`, {
      method: "GET",
      headers: {
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
        toast.warning("User Not Found")
      });
  };

  const handleUpdate = () => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:8080/user/withdrawl?id=${userId}&amount=${amount}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable To WithDrawal ");
        }
        return response.json();
      })
      .then((data) => {
        setResponseMessage("Amount Withdrawal");
        toast.success("Amount Withdrawal");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
        toast.warning(error.message);
      });
  };
  return (
    <>
    <Navbar/>
      <div className="content-center">
              
    <Toast/>
        <h2>WithDrawl Funds</h2>
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

                <button onClick={handleUpdate}>Withdrawl</button>
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

export default Withdrawl;
