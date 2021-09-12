import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from './authSlice'


export const Login = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [status, setStatus] = useState('idle')
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/home')
    }
  }, [token, navigate])

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      setStatus('pending')
      const result = await dispatch(login({ email, password }))
      unwrapResult(result)
      setStatus("success")

    } catch (error) {
      console.log('something went wrong')
    } finally {
      setEmail('')
      setPassword('')
      setStatus('idle')
    }
  }



  return (

        <div className="bg-grey-lighter mt-4">
        <div className="container max-w-sm mx-auto px-2 pt-5">
          <form
            onSubmit={loginHandler}
            className="bg-white px-6 py-6 rounded shadow-md text-black w-full"
          >
            <h1 className="text-4xl font-bold text-center font-allura text-gray-700 m-1">
              Socials
            </h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-2 rounded mb-4 focus:outline-none focus:ring"
              name="username"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Username or Email"
            />
  
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:ring"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
  
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-purple-500 text-white focus:outline-none focus:ring my-1 text-lg"
            >
              {status === 'pending' ? 'loading...' : 'Log In'}
            </button>
  
            <div className="text-grey-dark mt-3 text-center">
              Don't have an account?
              <Link
                to="/signup"
                className=" p-0.5 text-sm text-blue-600 underline"
              >
                signup
              </Link>
            </div>
          </form>
        </div>
      </div>


  )
}
