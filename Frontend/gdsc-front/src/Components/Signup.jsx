import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { createaccount } from '../store/ALLReducer/Authenticationreducer';
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom';
export default function SignUp() {
    const admin_panel=[
        "22ucs216@lnmiit.ac.in",
        "22ucs067@lnmiit.ac.in",
        "22ucs110@lnmiit.ac.in",
        "22ucs236@lnmiit.ac.in",
        "22ucs212@lnmiit.ac.in"
    ]
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const [captcha,setcaptcha]=useState("");
    const [data,setdata]=useState({fullName:"",email:"",password:"",role:"",confirmpassword:"",captcha:""})
    function generatecaptcha(){
        const number=Math.floor(Math.random()*1000000);
        setcaptcha(number);
    }
    function checkpassword(password){
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        if(!hasLowerCase || !hasSpecialChar || !hasUpperCase || !hasNumber ){
            return false;
        }
        return true;
    }
    async function handlesubmit(){
        if(captcha!=data.captcha){
           toast.error("invalid captcha")
            return;
        }
        if(!data.email.endsWith("@lnmiit.ac.in")){
            toast.error("Invalid email address")
            return;
        }
        if(data.password!=data.confirmpassword){
            toast.error("Passwords do not match")
            return;
        }
        if(!checkpassword(data.password)){
            toast.error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
            return;
        }
        if(data.role=='Admin'){
            if(!admin_panel.includes(data.email)){
                toast.error("Only admin with email accounts can be created")
                return;
            }
        }
        const obj={fullName:data.fullName,email:data.email,password:data.password,role:data.role}
        const response=await dispatch(createaccount(obj));
        console.log(response);
        if (response?.payload?.data?.success) {
            navigate('/verify')
        }
        setdata({fullName:"",email:"",role:"",password:"",confirmpassword:"",captcha:""})
    }
    useEffect(()=>{
        generatecaptcha()
    },[])
    return (
        <section className="rounded-md bg-black/80 p-2">
            <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <h2 className="text-2xl font-bold leading-tight text-black">Sign up to create account</h2>
                    <p className="mt-2 text-base text-gray-600">
                        Already have an account?{' '}
                        <Link to='/signin'>
                           Signin
                        </Link>
                    </p>
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="name" className="text-base font-medium text-gray-900">
                                {' '}
                                Full Name{' '}
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Full Name"
                                    id="name"
                                    value={data.fullName}
                                    onChange={(e)=>setdata({...data,fullName:e.target.value})}
                                ></input>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="text-base font-medium text-gray-900">
                                {' '}
                                Email address{' '}
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="email"
                                    placeholder="Email"
                                    id="email"
                                    value={data.value}
                                    onChange={(e)=>setdata({...data,email:e.target.value})}
                                ></input>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Password{' '}
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="password"
                                    placeholder="Password"
                                    id="password"
                                    value={data.password}
                                    onChange={(e)=>setdata({...data,password:e.target.value})}
                                ></input>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="conpassword" className="text-base font-medium text-gray-900">
                                    {' '}
                                    ConfirmPassword{' '}
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="password"
                                    placeholder="Password"
                                    id="conpassword"
                                    value={data.confirmpassword}
                                    onChange={(e)=>setdata({...data,confirmpassword:e.target.value})}
                                ></input>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="Accounttype" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Role{' '}
                                </label>
                            </div>
                            <div className="mt-2">
                                <select name="Accounttype"  id="" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e)=>(setdata({...data,role:e.target.value}))}>
                                    <option></option>
                                    <option value="Student">Student</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="button"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                >
                                    {captcha}
                                </button>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Captcha"
                                        id="name"
                                        value={data.captcha}
                                        onChange={(e)=>setdata({...data,captcha:e.target.value})}
                                    ></input>
                                </div>
                            </div>

                        </div>
                        <div>
                            <button
                                type="button"
                                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                onClick={handlesubmit}
                            >
                                Create Account
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
