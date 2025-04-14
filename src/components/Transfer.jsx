import React, { useState } from "react";
import Toast from "./Toast";
import {Toaster, toast} from "sonner";
import Navbar from "./NavBar";
const Transfer = () => {
  const [senderId, setSenderId] = useState("");
  const [receiverId, setRececiverId] = useState("");
  const [sender, setSender] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseMessage, setResonseMessage] = useState("");
  const token = sessionStorage.getItem("token");

  const fetchSender = () => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:8080/user/details/${senderId}`,{
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
        setSender(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setSender(null);
        setLoading(false);
        toast.warning(error.message);
      });
    };

    const fetchReceiver = () => {
        setLoading(true);
        setError(null);
        fetch(`http://localhost:8080/user/details/${receiverId}`,{
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
            setReceiver(data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setError(error.message);
            setReceiver(null);
            setLoading(false);
            toast.warning(error.message);
          });
        };

    const handleTransfer = () => {
      setLoading(true);
      setError(null);
      fetch(
        `http://localhost:8080/user/transfer?senderId=${senderId}&recieverId=${receiverId}&amount=${amount}`,{
          method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Unable To Transfer");
          }
          return response.json();
        })
        .then((data) => {
          setResonseMessage("Amount Transfered");
          setLoading(false);
          toast.success("Amount Transfered")
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
        <div>
          <h2>Transfer Funds</h2>
          <label>Enter Sender Id  </label><input
            type="text"
            name="senderId"
            value={senderId}
            placeholder="Enter Sender Id"
            onChange={(e) => setSenderId(e.target.value)}
          ></input>
          <button onClick={fetchSender}>Submit</button>
        </div>
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {sender && (
            <div>
              <div>
              <label>Enter Reciever Id  </label>  
                <input
                  type="text"
                  name="receiverId"
                  value={receiverId}
                  placeholder="Enter Receiver Id"
                  onChange={(e) => setRececiverId(e.target.value)}
                ></input>
                <button onClick={fetchReceiver}>Submit</button>
              </div>
              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}
              {receiver && (
                <div>
                    <label>Enter Amount  </label>
                  <input
                type="text"
                name="amount"
                value={amount}
                placeholder="Insert amount"
                onChange={(e)=>setAmount(e.target.value)}
                />

                <button onClick={handleTransfer}>Transfer</button>
                <div>
                    {error && <p>{error}</p>}
                    {responseMessage && <p>{responseMessage}</p>}
                </div>  
                    </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Transfer;
