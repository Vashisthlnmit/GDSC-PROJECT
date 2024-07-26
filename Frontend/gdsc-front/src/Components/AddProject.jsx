import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux"
import { createproject } from "../store/ALLReducer/ProjectAuthentication";
export default function AddProject() {
    const dispatch = useDispatch()
    const [data, setdata] = useState({ projectname: "", githubprojectlink: "", livehostedlink: "", techstackused:"",thumbnail:""})
    const [imagepreview, setPreview] = useState("")
    function handleImageupload(e) {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            console.log(file);
            const filereader = new FileReader();
            setdata({ ...data, thumbnail: file })
            filereader.readAsDataURL(file);
            filereader.addEventListener("load", function () {
                setPreview(this.result)
            })
        }
    }
    async function Submit() {
        if(!data.projectname || !data.githubprojectlink){
            toast.error("projectname and githubprojectlink is required")
            return;
        }
        const resp=await dispatch(createproject(data));
        console.log(resp);
        setdata({projectname:"",githubprojectlink:"",livehostedlink:"",techstackused:"",thumbnail:""})
        setPreview("")
    }

    return (
        <>
            <div className="min-h-screen bg-white">
                <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                    <h1 className="text-xl font-bold mb-4">Add a Project </h1>
                    <div className="mb-4">
                        {imagepreview ? (<img src={imagepreview}></img>) : (
                            <div>Add photo for your portfolio</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="title">
                            Add thumbnail for your project
                        </label>
                        <input
                            type="file"
                            onChange={handleImageupload}
                        />
                    </div>
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