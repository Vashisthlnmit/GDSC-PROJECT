import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { viewmember } from "../store/ALLReducer/Authenticationreducer";
import { useNavigate } from "react-router-dom";
export default function ViewMember(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [data,setdata]=useState([])
    async function handlesubmit(){
        const resp= await dispatch(viewmember())
        console.log(resp)
        if(resp?.payload?.data?.success){
            setdata(resp?.payload?.data?.data);
        }
    }
    useEffect(()=>{
        handlesubmit()
    },[])
    return (
        <>
           <div className="container mx-auto mt-8">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">FullName</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Role</th>
                                <th className="py-2 px-4 border-b">View Projects</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user, index) => (
                                <tr key={user?._id}>
                                    <td className="py-2 px-4 border-b">{user?.fullName}</td>
                                    <td className="py-2 px-4 border-b">
                                       {user?.email}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                       {user?.role}
                                    </td>
                                    <td>
                                        <button onClick={()=>(navigate('/viewproject',{state:{userid:user?._id}}))}>View Projects</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}