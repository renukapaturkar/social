import React from 'react'
import { Link } from 'react-router-dom'
import { DateFormat } from './utils/dateFormat'

export const CommentBody = ({ comments }) => {
  console.log(comments, 'These are comments')
  const renderedComment = React.Children.toArray(
    comments?.map((item) => (
      <div className="bg-white mt-1 w-full p-1 md:p-0 md:max-w-lg rounded shadow">
        <div className="flex pl-2 pt-3">
          <div className="flex">
            {item.userId.profilePicture ? (
              <img
                className="rounded-full w-10 h-10 object-cover"
                src={item.userId.profilePicture}
                alt="img"
              />
            ) : (
              <div
                className={`flex text-2xl text-white items-center capitalize justify-center rounded-full w-10 h-10 bg-blue-600`}
              >
                <span>{item.userId.name?.substr(0, 1)}</span>
              </div>
            )}
          </div>

          <div className="flex p-1">
            <div className="flex items-center">
              <span>
                <Link
                  className="text-md font-semibold"
                  to={`/${item.userId.username}`}
                >
                  {item.userId.name}
                </Link>
                <span className="px-1 text-xs">@{item.userId.username}</span>
                <span>{<DateFormat timestamp={item.createdAt} />}</span>
              </span>
            </div>
          </div>
        </div>
        <div>
          <p className="py-3 px-2">{item.comment}</p>
        </div>
      </div>
    ))
  )

  return <>{renderedComment}</>
}
