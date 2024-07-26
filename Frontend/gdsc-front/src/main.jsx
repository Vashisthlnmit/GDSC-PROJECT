import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import ErrorPage from './Components/Errorpage.jsx'
import {Provider} from "react-redux"
import store from './store/store.js'
import SignUp from './Components/Signup.jsx'
import { SignIn } from './Components/Signin.jsx'
import Verifypage from './Components/Verify.jsx'
import AddProject from './Components/AddProject.jsx'
import ViewProject from './Components/ViewProject.jsx'
import ViewMember from './Components/ViewMember.jsx'
import Dashboard from './Components/Dashboard.jsx'
import EditProject from './Components/EditProject.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<ErrorPage/>} element={<Layout/>}>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/verify' element={<Verifypage/>}/>
      <Route path='/addproject' element={<AddProject/>}/>
      <Route path='/viewproject' element={<ViewProject/>}/>
      <Route path='/viewmember' element={<ViewMember/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/edit' element={<EditProject/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
