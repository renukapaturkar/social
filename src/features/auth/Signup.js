import { unwrapResult } from '@reduxjs/toolkit'
import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import {signUp} from './authSlice'

export const Signup = () => {
  const [status, setStatus] = useState("idle")
  const dispatch = useDispatch()
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "", 
    username: "", 
    password: "", 
    confirmpassword: ""

  })

  const onChangeHandler = (e) => {
    setUserDetails((userDetails)=> ({
      ...userDetails, 
      [e.target.name]: e.target.value
    }))
  }

  const passwordMatch = userDetails.confirmpassword !== "" && userDetails.confirmpassword === userDetails.password
  const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(
    userDetails.password
  );

  const createNewUser = async() => {
    try{
      setStatus("pending")
      const response = await dispatch(
        signUp({
          ...userDetails,
          username: userDetails.username.toLowerCase().trim()
        })
      )
      unwrapResult(response)
        setUserDetails({
          name: "",
          email: "", 
          username: "", 
          password: "", 
          confirmpassword: ""
        })


    }catch(error){
      console.log("somthing bad happened")
    }finally {
      setStatus("idle")
    }
  }




  const submitHandler = (e) => {
    e.preventDefault();
    if(!passwordMatch){
      console.log("Password do not match")
      return 
    }else {
      createNewUser();
    }
   
    
  }


  return (
    <div className="bg-grey-lighter mt-4">
      <div className="container max-w-sm mx-auto px-2 pt-5">
        <form
          onSubmit={submitHandler}
          className="bg-white px-6 py-6 rounded shadow-md text-black w-full"
        >
          <h1 className="text-4xl font-bold text-center font-allura text-gray-700">Socials</h1>
          <div className="text-center p-1"></div>

            <input
            type="text"
            className="block border border-grey-light w-full p-2 rounded mb-4 focus:outline-none focus:ring"
            name="name"
            autoFocus= {true}
            value={userDetails.name}
            onChange={onChangeHandler}
            required
            placeholder="Full Name"
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-2 rounded mb-4 focus:outline-none focus:ring"
            name="email"
            value={userDetails.email}
            onChange= {onChangeHandler}
            required
            placeholder="Email"
          />

        <input
            type="text"
            className="block border border-grey-light w-full p-2 rounded mb-4 focus:outline-none focus:ring"
            name="username"
            value={userDetails.username}
            onChange= {onChangeHandler}
            required
            placeholder="username"
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:ring"
            name="password"
            value={userDetails.password}
            onChange= {onChangeHandler}
            placeholder="Password"
          />

            <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:ring"
            name="confirmpassword"
            value={userDetails.confirmpassword}
            onChange= {onChangeHandler}
            placeholder="Confirm Password"
          />  

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-purple-500 text-white focus:outline-none focus:ring my-1 text-lg"
            disabled={!isPasswordValid}
          >
           {status === "pending" ? "Loading..." : "Sign Up"}
          </button>

          <div className="text-grey-dark mt-3 text-center">
            Already have an account?
            <Link
              to="/login"
              className=" p-0.5 text-sm text-blue-600 underline"
              
            >
              login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
