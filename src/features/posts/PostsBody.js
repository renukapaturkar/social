import { Link } from 'react-router-dom'

export const PostBody = ({ post }) => {
  const {
    userId: { name, username, profilePicture },
    content,
    image,
    likes,
    comments,
    createdAt,
    _id,
  } = post

  return (
    <div className="bg-white mt-1 w-full p-1 md:p-0 md:max-w-lg shadow">
      <div className="flex pl-2 pt-3">
        {profilePicture ? (
          <img
            className="rounded-full w-12 h-12 object-cover"
            src={profilePicture}
            alt="img"
          />
        ) : (
          <div
            className={`flex text-2xl text-white items-center capitalize justify-center rounded-full w-12 h-12 bg-blue-600`}
          >
            <span>{name?.substr(0, 1)}</span>
          </div>
        )}
      </div>
      <div className="pl-3">
        <div className="flex items-center">
          <Link to={`/${username}`}>{username}</Link>
          <div>{name}</div>
          <div>{createdAt}</div>
        </div>
      </div>

      <div>
        {image && <img src={image} alt={name} className="mt-2" />}
        <p className="py-3 px-2">{content}</p>
      </div>
      <div className="flex justify-end text-gray-700">
        <p className="mr-2">{likes.length} likes</p>
        <p className="mr-2">{comments.length} comments</p>
      </div>
      <div className="flex justify-around my-1 border-t-2"></div>
    </div>
  )
}
