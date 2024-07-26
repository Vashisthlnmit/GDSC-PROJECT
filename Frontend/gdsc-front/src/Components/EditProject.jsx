import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux"
import { editproject } from "../store/ALLReducer/ProjectAuthentication";
import { useLocation } from "react-router-dom";
export default function EditProject() {
    const dispatch = useDispatch()
    const location =useLocation()
    const [data, setdata] = useState({ projectname: "", githubprojectlink: "", livehostedlink: "", techstackused:""})
    async function Submit() {
        const projectname=data.projectname.length>0 ? data.projectname:null
        const githubprojectlink=data.githubprojectlink.length>0 ? data.githubprojectlink:null
        const livehostedlink=data.livehostedlink.length>0 ? data.livehostedlink:null
        const techstackused=data.techstackused.length>0 ? data.techstackused:null
        const dataobject={projectid:location.state.projectid,projectname:projectname,githubprojectlink:githubprojectlink,livehostedlink:livehostedlink,techstackused:techstackused}
        const resp=await dispatch(editproject(dataobject));
        console.log(resp);
        setdata({projectname:"",githubprojectlink:"",livehostedlink:"",techstackused:""})
    }

    return (
        <>
        <h1>Edit your Project the fields you want to</h1>
            <div className="min-h-screen bg-white">
                <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="title">
                            ProjectName
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={data.projectname}
                            onChange={(e) => setdata({ ...data, projectname: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="description">
                           Githubprojectlink
                        </label>
                        <input
                            id="description"
                            type="text"
                            value={data.githubprojectlink}
                            onChange={(e) => setdata({ ...data, githubprojectlink: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            rows="5"
                            required
                        ></input>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="techused">
                           TechStackUsed
                        </label>
                        <input
                            id="techused"
                            type="text"
                            value={data.techstackused}
                            onChange={(e) => setdata({ ...data, techstackused: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            rows="5"
                            required
                        ></input>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="livehost">
                           LiveLinkHosted
                        </label>
                        <input
                            id="livehost"
                            type="text"
                            value={data.livehostedlink}
                            onChange={(e) => setdata({ ...data, livehostedlink: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            rows="5"
                            required
                        ></input>
                    </div>
                    <button
                        onClick={Submit}
                        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}