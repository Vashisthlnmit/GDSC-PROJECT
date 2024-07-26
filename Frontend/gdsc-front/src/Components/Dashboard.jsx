import React from "react";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
    const data = JSON.parse(localStorage.getItem('data'));
    const navigate = useNavigate()
    if (!data) {
        navigate('/signin')
    }
    return (
        <>
            <h1>Welcome to DashBoard</h1>
            <div className="m-4 p-4">
                {
                    data.role == 'Admin' ? <>
                        <div className="flex flex-col">
                            <h1 className="font-bold text-center">Welcome to Admin Panel</h1>
                            <button onClick={() => (navigate('/viewmember'))} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">View Memeber</button>
                        </div>
                    </> : <>
                        <div className="flex flex-col">
                            <h1 className="font-bold text-center">Welcome to Student Dashboard</h1>
                            <button onClick={() => (navigate('/viewproject', { state: { userid: data._id } }))} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">View your project</button>
                            <button onClick={() => (navigate('/addproject'))} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Add your project</button>
                            
                        </div>
                    </>
                }
            </div>
        </>
    )
}