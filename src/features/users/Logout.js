import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import {logout} from "../auth/authSlice"



export const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logouthandler = () => {
        dispatch(logout())
        navigate('/login')
    }
        return (
            <button className="border bg-purple-600 text-white p-1 rounded-md " onClick={logouthandler}>Logout</button>
        )
    }