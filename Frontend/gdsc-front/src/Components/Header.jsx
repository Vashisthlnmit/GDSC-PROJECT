import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/ALLReducer/Authenticationreducer";
export default function Navbar() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    async function Logout(){
        dispatch(logout())
        navigate("/")
    }
    const data=localStorage.getItem("isloggedin") || false
    return (
        <>
            <nav className="bg-white p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex space-x-4">
                        {
                            data ? <>
                             <Link to={'/dashboard'}>DashBoard</Link>
                             <button onClick={()=>(Logout())} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Logout</button>
                            </> :<>
                              <Link to={'/signup'}>Signup</Link>
                              <Link to={'/signin'}>Signin</Link>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}