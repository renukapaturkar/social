import { useDispatch, useSelector } from "react-redux"
import {useState} from 'react'
import { IoImageOutline } from 'react-icons/io5'
import { ImCancelCircle } from 'react-icons/im'
import { updateProfile, updateUserProfile } from "./usersSlice"
import { unwrapResult } from "@reduxjs/toolkit"
import { useNavigate } from "react-router"



export const EditProfile = () => {
    const {currentUser} = useSelector(state => state.auth)
    const {user} = useSelector(state => state.users)
    const [profilePicture, setProfilPicture] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [values, setValues] = useState({
        name:"",
        username: "",
        bio:""

    })


    const changeProfilePicture = (e) => {
        setProfilPicture(e.target.files[0])
        e.target.value = ""
    }

    const removeProfilePicture = () => {
        setProfilPicture("")
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
            const result = await dispatch(updateProfile({values, profilePicture}))
            unwrapResult(result)
            console.log(result, "Result for update profile")
            if(result){
                const updatedProfile = {
                    name: result?.payload.name,
                    username: result?.payload.username,
                    bio: result?.payload.bio
                }
                dispatch(updateUserProfile(updatedProfile))
            }
            navigate(`/home`)
            setProfilPicture("")
            setValues("")
        }catch(error){
            console.log(error)
        }
            
    }


  return (
    <div className="flex w-full border h-auto p-4 ">
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
        {profilePicture && (
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
            <div className="text-md font-semibold">username</div>
            <input
              className="border w-3/4 rounded-md p-1 m-1"
              defaultValue={values.username}
              type="text"
              name="username"
              id="username"
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
              Save
            </button>
            <button className="border p-2 px-4 rounded-md text-purple-600 border-purple-600 text-xl m-2">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
