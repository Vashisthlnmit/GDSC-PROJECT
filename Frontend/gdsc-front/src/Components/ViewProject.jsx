import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { viewproject,deleteproject } from "../store/ALLReducer/ProjectAuthentication";
import { Link, useLocation, useNavigate } from "react-router-dom";
export default function ViewProject() {
    const location=useLocation();
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [data, setdata] = useState([])
    async function handlesubmit() {
        const resp = await dispatch(viewproject(location.state.userid))
        console.log(resp);
        setdata(resp?.payload?.data?.data)
    }
    async function removeproject(projectid){
        console.log(projectid);
        const answer=window.confirm("are sure  you want to delete this project")
        console.log(answer);
        if(answer){
            const resp = await dispatch(deleteproject(projectid))
            console.log(resp);
            if (resp?.payload?.data?.sucess) {
               handlesubmit()
            } 
            else{
                return;
            }
        }
        else{
            return;
        }
    }
    useEffect(() => {
        handlesubmit()
    }, [])
    return (
        <>
            <div className="container mx-auto mt-8">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Project Name</th>
                                <th className="py-2 px-4 border-b">GitHub Project Link</th>
                                <th className="py-2 px-4 border-b">Live Hosted Link</th>
                                <th className="py-2 px-4 border-b">Tech Stack Used</th>
                                <th className="py-2 px-4 border-b">Thumbnail</th>
                                <th className="py-2 px-4 border-b">Deleteproject</th>
                                <th className="py-2 px-4 border-b">Edit Project</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((project, index) => (
                                <tr key={project?._id}>
                                    <td className="py-2 px-4 border-b">{project?.projectname}</td>
                                    <td className="py-2 px-4 border-b">
                                        <Link to={project?.githubprojectlink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            {project?.githubprojectlink}
                                        </Link>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <Link to={project?.livehostedlink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            {project?.livehostedlink}
                                        </Link>
                                    </td>
                                    <td className="py-2 px-4 border-b">{project?.techstackused}</td>
                                    <td>
                                        <img width="72" height="72" src={project?.thumbnail} alt="err while loading the image"/>
                                    </td>
                                    <td>
                                        <button onClick={()=>removeproject(project?._id)} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Delete</button>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                    <button onClick={()=>navigate('/edit',{state:{projectid:project?._id}})} class="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Edit Project</button>
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