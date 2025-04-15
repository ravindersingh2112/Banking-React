import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./NavBar";


const Home=()=>{
return(
    <>
        <div>
    <Navbar></Navbar>  
    <h1 className="text-3xl font-bold underline bg-red-500">
      Hello world!
    </h1>
    </div>
    </>
)
}

export default Home;