import { useDispatch, useSelector } from 'react-redux'
import { followUser, unfollowUser } from './usersSlice'

export const FollowUser = ({ user }) => {
  const { currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  console.log('user._id', user._id)
  console.log('cureenyId._id', currentUser._id)

  const followOrUnfollowUser = () => {
    if (user?.followers.includes(currentUser?._id)) {
      dispatch(unfollowUser(user._id))
    } else {
      dispatch(followUser(user._id))
    }
  }

  const toggleButton = () => {
    if (user?.followers.includes(currentUser?._id)) {
      return false
    } else {
      return true
    }
  }

  return (
    <button
      className="border bg-purple-600 text-white p-1 rounded-md"
      onClick={followOrUnfollowUser}
    >
      {toggleButton() ? 'Follow' : 'Unfollow'}
    </button>
  )
}
