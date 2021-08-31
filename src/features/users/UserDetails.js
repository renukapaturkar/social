import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getUser } from "./usersSlice";

export const UserDetails = () => {
    const {username} = useParams();
    const dispatch = useDispatch()
    const {user} = useSelector((state)=> state.users)
    console.log(user, "user")
    const {token, loggedUser} = useSelector(state => state.auth)
    const [status, setStatus] = useState("idle")


    useEffect(()=> {

            (async()=> {
                try {
                    setStatus("pending")
                    const result = await dispatch(getUser(username))
                    unwrapResult(result)
                    console.log(result, "userdetails page - This is the user")
                    setStatus("success")
                }catch(error){
                    console.log(error, "This is th error on Userdetails page")
                    setStatus("idle")
                }
            })()
        }
,[dispatch,token, username])

    const renderedUserProfile = (
        <div className="flex">
            This is user profile 
            
        {user.profilePicture ? (
          <img
            className="rounded-full w-12 h-12 object-cover"
            src={loggedUser.profilePicture}
            alt="img"
          />
        ) : (
          <div
            className={`flex text-2xl text-white items-center capitalize justify-center rounded-full w-12 h-12 bg-blue-600`}
          >
            <span>{user.name?.substr(0, 1)}</span>
          </div>
        )}

        <div className="">
            <span>{user.username}</span>
            <span>{user.name}</span>
            
        </div>
        </div>

    )

    return(
        <div>
            {renderedUserProfile}
            {status === "pending" && <h1>Loading...</h1>}
        </div>
    )
}