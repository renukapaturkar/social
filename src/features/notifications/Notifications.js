import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getNotifications } from './notificationSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { IoIosArrowBack } from 'react-icons/io'

export const Notifications = () => {
  const { notification } = useSelector((state) => state.notifications)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (token) {
      ;(async () => {
        try {
          setStatus('pending')
          const result = await dispatch(getNotifications())
          console.log(result, 'result of notification')
          unwrapResult(result)
          setStatus('success')
        } catch (error) {
          console.log(error)
          setStatus('idle')
        }
      })()
    }
  }, [dispatch, token])

  const renderNotifications =
    notification.length === 0 ? (
      <div className="flex p-2 font-semibold items-center text-gray-600">
        No Notifications Yet!
      </div>
    ) : (
      React.Children.toArray(
        notification?.map((details) => (
          <div>
            <Link
              className="flex items-center space-x-2 pl-2 py-2"
              to={`/${details?.user.username}`}
            >
              {details.user.profilePicture ? (
                <img
                  className="rounded-full w-10 h-10 object-cover"
                  src={details.user.profilePicture}
                  alt="img"
                />
              ) : (
                <div
                  className={`flex text-2xl text-white items-center capitalize justify-center rounded-full w-10 h-10 bg-purple-600`}
                >
                  <span>{details.user.name?.substr(0, 1)}</span>
                </div>
              )}
              <div className="font-semibold">{details.user.name}</div>
              <div>
                {details.notify === 'like' && `liked your post`}
                {details.notify === 'comment' && `commented on your post`}
                {details.notify === 'follow' && `followed you!`}
              </div>
            </Link>
          </div>
        ))
      )
    )
  return (
    <div className="flex items-center flex-col mt-3 mb-10 p-8">
      <Link to={`/home`} className="flex items-center text-sm">
        <IoIosArrowBack />
        <span>Back</span>
      </Link>
      <div className="bg-white mt-1 p-3 md:p-3 md:p-0 w-full md:w-1/2 shadow">
        <div className="text-center text-lg font-semibold ">Notifications</div>
        {status === 'success' && renderNotifications}
      </div>
    </div>
  )
}
