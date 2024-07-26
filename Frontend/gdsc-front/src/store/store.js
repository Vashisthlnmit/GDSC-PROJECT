import {configureStore} from "@reduxjs/toolkit"
import Authenticationreducer from "./ALLReducer/Authenticationreducer"
const store =configureStore({
    reducer:{
        auth:Authenticationreducer
    }
})
export default store