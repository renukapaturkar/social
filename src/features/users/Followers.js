import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { IoIosArrowBack } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import { getFollowers } from './usersSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'

export const Followers = () => {
  const { username } = useParams()
  const dispatch = useDispatch()
  const [status, setStatus] = useState('idle')
  const { followers } = useSelector((state) => state.users)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    if (token) {
      ;(async () => {
        try {
          setStatus('pending')
          const result = await dispatch(getFollowers(username))
          unwrapResult(result)
          console.log(result, 'results')
          setStatus('success')
        } catch (error) {
          console.log('something went wrong')
          setStatus('idle')
        }
      })()
    }
  }, [dispatch, username, token])

  const renderFollowers =
    followers.length === 0 ? (
      <div className="text-center">
        <p className="p-2">No followers yet</p>
      </div>
    ) : (
      React.Children.toArray(
        followers?.map((user) => (
          <div className="flex space-evenly p-4 ">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="img"
                className="rounded-full w-10 h-10 md:w-10 md:h-10 object-cover"
              />
            ) : (
              <div
                className={`flex text-7xl capitalize text-white items-center justify-center rounded-full w-10 h-10 md:w-10 md:h-10 bg-purple-600`}
              >
                <span>{user.name.substr(0, 1)}</span>
              </div>
            )}
            <div className=" flex flex-col">
              <div className="px-1 text-sm font-semibold">{user.username}</div>
              <div className="px-1 text-sm">{user.name}</div>
            </div>
          </div>
        ))
      )
    )

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white mt-1 p-3 md:p-3 md:p-0 w-full md:w-1/2 rounded">
        <div className="mx-2 py-1 border-b-2">
          <Link to={`/${username}`} className="flex items-center text-sm">
            <IoIosArrowBack />
            <span>Back</span>
          </Link>
        </div>
        {status === 'success' && renderFollowers}
      </div>
    </div>
  )
}
