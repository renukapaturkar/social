import { Link } from 'react-router-dom'
import { DateFormat } from './utils/dateFormat'
import { AiFillHeart } from 'react-icons/ai'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { BsChat } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { likePost } from './postsSlice'

export const PostBody = ({ post }) => {
  const {currentUser} = useSelector(state=>state.auth)
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
  console.log(currentUser, "currentUser")
  const colorToggle = (post) => {
    if(post?.likes.includes(currentUser._id)) {
      return "text-red-600"
    }else {
      return ""
    }
  }

  return (
    <div className="flex flex-col bg-white mt-1 w-full p-1 md:p-0 md:max-w-lg shadow">
      <div className="flex p-2 w-full md:max-w-lg">
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
        </div>
        <div className="flex p-1">
          <div className="flex items-center">
            <span>
              <Link className="text-md font-semibold" to={`/${username}`}>
                {name}
              </Link>
              <span className="px-1 text-xs">@{username}</span>
              <span>{<DateFormat timestamp={createdAt} />}</span>
            </span>
          </div>
        </div>
      </div>

      <div>
        {image && <img src={image} alt={name} className="w-full" />}
        <p className="py-3 px-2 mx-2 text-sm font-normal ">{content}</p>
      </div>

      <span className="flex p-3 text-gray-400 justify-evenly">
        <button className={`flex ${colorToggle(post)}`} onClick={() => likeButtonHandler(post)}>
          <AiFillHeart className="w-5 h-5" />
          <span className="px-1 text-sm">{likes.length}</span>
        </button>
        <Link to={`/${username}/posts/${post._id}`} className="flex">
          <BsChat className="w-4 h-5" />
          <span className="px-1 text-sm">{comments.length}</span>
        </Link>
        <button className="flex">
          <AiOutlineShareAlt className="w-5 h-5" />
        </button>
      </span>
    </div>
  )
}
