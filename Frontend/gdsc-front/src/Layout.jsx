import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Header";
export default function Layout(){
    return(
        <>
          <Navbar/>
          <Outlet/>
          <Toaster/>
        </>
    )
}