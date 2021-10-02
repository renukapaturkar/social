import { useDispatch, useSelector } from "react-redux"
import {useState, useEffect} from 'react'
import { IoImageOutline } from 'react-icons/io5'
import { ImCancelCircle } from 'react-icons/im'
import { updateProfile, updateUserProfile } from "./usersSlice"
import { unwrapResult } from "@reduxjs/toolkit"
import { useNavigate } from "react-router"
import {Link} from 'react-router-dom'



export const EditProfile = () => {
    const {currentUser} = useSelector(state => state.auth)
    console.log(currentUser, "currentUser")
    const {user} = useSelector(state => state.users)
    const [image, setImage] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [status, setStatus] = useState("idle")
    const [values, setValues] = useState({
        name:currentUser.name,
        bio:currentUser.bio,
        profilePicture: currentUser.profilePicture 

    })


    const changeProfilePicture = (e) => {
        setImage(e.target.files[0])
        e.target.value = ""
    }

    const removeProfilePicture = () => {
        setImage("")
    }

    const onChangeHandler = (e) => {
        setValues((values)=>({
            ...values, 
            [e.target.name]: e.target.value
        }))
    }

    const submitHandler = async(e) => {
        e.preventDefault()
        try{
          setStatus("pending")
          console.log(values, image, "values and profilepicture")
            const result = await dispatch(updateProfile({values, image}))
            unwrapResult(result)
            setStatus("success")
            if(result){
                const updatedProfile = {
                    _id: result?.payload.data.user._id,
                    name: result?.payload.data.user.name,
                    username: result?.payload.data.user.username,
                    profilePicture: result?.payload.data.user.profilePicture,
                    bio: result?.payload.data.user.bio
                }
                dispatch(updateUserProfile(updatedProfile))
            }
            

            setImage("")
            setValues("")
        }catch(error){
            console.log(error)
            setStatus("idle")
        }
            
    }


  return (
    <div className="flex w-full border h-auto p-8 m-4">
      <form className="flex flex-col w-full p-2 align-center" onSubmit={submitHandler}>
        <h1 className="text-center m-2 text-xl font-semibold">Edit Profile</h1>
        <div className="flex">
        <label className="flex cursor-pointer items-center rounded p-2  font-medium">
        <IoImageOutline className="text-2xl text-gray-600 m-3" />
          <span>Add/change Photo</span>

          <input
            type="file"
            name="file"
            id="file"
            className="hidden"
            accept="image/jpg, image/jpeg"
            onChange={changeProfilePicture}
          />
        </label>
        {image && (
              <ImCancelCircle
                className="m-4 text-2xl cursor-pointer text-gray-500"
                onClick={removeProfilePicture}
                title="Remove image"
              />
            )}

        </div>


        <div className="flex flex-col justify-center">
          <label className="p-1 m-1">
            <div className="text-md font-semibold">Name</div>
            <input
              className="border w-3/4 rounded-md p-1 m-1"
              defaultValue={values.name}
              type="text"
              name="name"
              id="name"
              onChange={onChangeHandler}
              
            />
          </label>


          <label className="p-1 m-1">
            <div className="text-md font-semibold">Bio</div>
            <textarea
              className="border w-3/4 rounded-md p-1 m-1"
              type="text"
              name="bio"
              id="bio"
              onChange={onChangeHandler}
            />
          </label>



          <div className="p-2 m-2 space-between items-center">
            <button className="border p-2 px-4 rounded-md bg-purple-600 text-white text-xl m-2">
              {status === "pending" ? "Saving..." : "Save"}
            </button>
            <button className="border p-2 px-4 rounded-md text-purple-600 border-purple-600 text-xl m-2">
              <Link to={`/${currentUser.username}`}>Cancel</Link>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
