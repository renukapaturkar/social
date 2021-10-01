import { Link } from 'react-router-dom'
import { DateFormat } from './utils/dateFormat'
import { AiFillHeart } from 'react-icons/ai'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { BsChat } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { likePost } from './postsSlice'

export const PostBody = ({ post }) => {
  const { currentUser } = useSelector((state) => state.auth)
  const {
    userId: { name, username, profilePicture },
    content,
    image,
    likes,
    comments,
    createdAt,
    _id,
  } = post
  const dispatch = useDispatch()

  const likeButtonHandler = async (post) => {
    try {
      const result = await dispatch(likePost(_id))
    } catch (error) {
      console.log(error)
    }
  }
  const colorToggle = (post) => {
    if (post?.likes.includes(currentUser._id)) {
      return 'text-red-600'
    } else {
      return ''
    }
  }

  return (
    <div className="bg-white mt-1 w-full md:max-w-lg shadow rounded self-center">
      <div className="flex pl-2 pt-3">
        <div className="flex">
          {profilePicture ? (
            <img
              className="rounded-full w-10 h-10 object-cover"
              src={profilePicture}
              alt="img"
            />
          ) : (
            <div
              className={`flex text-2xl text-white items-center capitalize justify-center rounded-full w-10 h-10 bg-purple-600`}
            >
              <span>{name?.substr(0, 1)}</span>
            </div>
          )}
          <span className="px-1">
            <Link className="text-md font-semibold" to={`/${username}`}>
              {name}
            </Link>
            <span className="px-1 text-xs">@{username}</span>
            <span>{<DateFormat timestamp={createdAt} />}</span>
          </span>
        </div>
      </div>
      <Link to={`/${username}/posts/${post._id}`} className="flex">
      <div className="flex flex-col w-full">
        {image && <img src={image} alt={name} className="mt-2" />}
        <p className="py-3 px-2 text-sm font-normal">{content}</p>
      </div>
      </Link>

      <span className="flex p-3 text-gray-400 justify-evenly">
        <button
          className={`flex ${colorToggle(post)}`}
          onClick={() => likeButtonHandler(post)}
        >
          <AiFillHeart className="w-5 h-5" />
          <span className="px-1 text-sm">{likes.length}</span>
        </button>
        <Link to={`/${username}/posts/${post._id}`} className="flex">
          <BsChat className="w-4 h-5" />
          <span className="px-1 text-sm">{comments.length}</span>
        </Link>
      </span>
    </div>
  )
}
