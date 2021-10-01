import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { FollowUser } from './FollowUser'
import { Logout } from './Logout'
import { UsersPosts } from './UsersPosts'
import { getUser } from './usersSlice'

export const UserDetails = () => {
  const { username } = useParams()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.users)
  const { token, currentUser } = useSelector((state) => state.auth)
  const [status, setStatus] = useState('idle')
  const checkExistingUser = (currentUser, randomUser) => {
    return currentUser === randomUser
  }
  const EditButton = () => {
    return (
      <Link to={`/${user.username}/editprofile`}>
        {' '}
        <div className="text-xs p-1 m-2 border text-center">Edit Profile</div>
      </Link>
    )
  }
  const editProfileButton = checkExistingUser(currentUser._id, user._id) && (
    <EditButton />
  )

  const renderLogoutButton = checkExistingUser(currentUser._id, user._id) && (
    <Logout />
  )

  const renderFollowButton = checkExistingUser(currentUser._id, user._id) || (
    <FollowUser user={user} />
  )

  useEffect(() => {
    (async () => {
      try {
        setStatus('pending')
        const result = await dispatch(getUser(username))
        unwrapResult(result)
        setStatus('success')
      } catch (error) {
        console.log(error, 'This is th error on Userdetails page')
        setStatus('idle')
      }
    })()
  }, [dispatch, token, username])

  const renderedUserProfile = status === 'success' && (
    <div className="flex flex-col items-center p-8 m-4">
      <div className="flex p-2 w-full md:max-w-lg shadow-md relative">
        <div className="flex m-1 justify-center">
          {user.profilePicture ? (
            <img
              className="rounded-full w-20 h-20 md:w-12 md:h-12 object-cover"
              src={user.profilePicture}
              alt="img"
            />
          ) : (
            <div
              className={`flex text-3xl text-white items-center capitalize justify-center rounded-full w-20 h-20 bg-purple-600`}
            >
              <span>{user.name?.substr(0, 1)}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col py-1">
          <h1 className="text-lg">{user.name}</h1>
          <div className="text-md">@{user.username}</div>
          <div className="text-sm">{user.bio}</div>
          <div className="flex">{editProfileButton}</div>

          <div className="flex text-xs justify-evenly px-1">
            <Link to={`/${username}/followers`} className="py-1 px-1">
              {user?.followers.length} followers
            </Link>
            <Link to={`/${username}/following`} className="py-1 px-1">
              {user?.following.length} following
            </Link>
          </div>
        </div>
        <div className="justify-self-end p-1">{renderLogoutButton}</div>
        <div className="absolute top-4 right-2 p-4">{renderFollowButton}</div>
      </div>
    </div>
  )

  return (
    <div>
      {user && renderedUserProfile}
      {status === 'pending' && (
        <div className="text-xl text-center p-2">Loading...</div>
      )}
      <UsersPosts className="flex self-center" user={user} />
    </div>
  )
}
