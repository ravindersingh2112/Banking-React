import React, { useState } from "react";
import Toast from "./Toast";
import {Toaster, toast} from "sonner";
const CreateUser = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    balance: "",
    phoneNumber: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJSYXZpIiwiaWF0IjoxNzQzNzYxNzQ5LCJleHAiOjE3NDM3NjUzNDl9.l1tuFDJqS9hvu70EDejqo2mRdb_oPNvF4o4kjgsPTdo";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/user/create", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed To create User");
        }
        return response.json();
      })
      .then((data) => {
        setResponseMessage(`User Created Successfully! Id: ${data.id}`);
        setFormData({
          id: "",
          name: "",
          balance: "",
          phoneNumber: "",
        })
        toast.success(`User Created Successfully! Id: ${data.id}`)
        })
        .catch((error) => {
            console.error("Error Creating User ");
            setResponseMessage("Error creating user");
            toast.warning(error.message);
      });
  };

  return (
    <>
    <Toast/>
      <form onSubmit={handleSubmit}>
        <label>Id:</label>{" "}
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="Enter Id"
          required
        ></input>
        <br></br>
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
        <button type="submit">Create User</button>

        {responseMessage && <p>{responseMessage}</p>}
      </form>
    </>
  );
};

export default CreateUser;
