import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom"
import { Logout } from "./Logout";
import { getUser } from "./usersSlice";

export const UserDetails = () => {
    const {username} = useParams();
    const dispatch = useDispatch()
    const {user} = useSelector((state)=> state.users)
    console.log(user, "user from profile")

    const {token, currentUser} = useSelector(state => state.auth)
    const [status, setStatus] = useState("idle")


    const checkExistingUser = (currentUser, randomUser) => {
        return currentUser === randomUser;
      };
      
    const EditButton = () => {
        return(
            <Link to={`/${user.username}/editprofile`}> <div className="text-xs p-1 m-2 border text-center">Edit Profile</div></Link>
        )
    }
    const editProfileButton = checkExistingUser(currentUser._id, user._id) && (<EditButton/>)




    const FollowButton = () => {
        return (
            <button className="border bg-purple-600 text-white p-1 rounded-md">follow</button>
        )
    }

    const renderLogoutButton = checkExistingUser(currentUser._id, user._id) && (<Logout/>)

    const renderFollowButton = checkExistingUser(currentUser._id, user._id) || <FollowButton/>



    useEffect(()=> {

            (async()=> {
                try {
                    setStatus("pending")
                    const result = await dispatch(getUser(username))
                    unwrapResult(result)
                    setStatus("success")
                }catch(error){
                    console.log(error, "This is th error on Userdetails page")
                    setStatus("idle")
                }
            })()
        }
,[dispatch,token, username])

    const renderedUserProfile = (status === "success" && (
        <div className="flex justify-center m-2">
        <div className="flex p-2 w-full md:3/4 shadow-md justify-evenly relative">
            <div className="flex m-1 justify-center">

            {user.profilePicture ? (
          <img
            className="rounded-full w-32 h-32 md:w-12 md:h-12 object-cover"
            src={user.profilePicture}
            alt="img"
          />
        ) : (
          <div
            className={`flex text-3xl text-white items-center capitalize justify-center rounded-full w-16 h-16 bg-purple-600`}
          >
            <span>{user.name?.substr(0, 1)}</span>
          </div>
        )}

            </div>


        <div className="flex flex-col p-2">
            <h1 className="text-lg">{user.name}</h1>
            <div className="text-xs">@{user.username}</div>
            <div className="text-sm">{user.bio}</div>
            <div className="flex">{editProfileButton}</div>
            

            <div className="flex text-sm">
            <span className="py-1 m-1">{user.followers.length} followers</span>
            <span className="py-1 m-1">{user.following.length} following</span>
        </div>
            
        </div>
        <div className="justify-self-end p-1">
            {renderLogoutButton}
        </div>
        <div className="absolute top-4 right-2 p-4">
            {renderFollowButton}
        </div>



        </div>

        </div>

    )
    )

    return(
        <div>
            {status === "success" && renderedUserProfile}
            {status === "pending" && <div className="text-xl text-center p-2">Loading...</div>}
        </div>
    )
}