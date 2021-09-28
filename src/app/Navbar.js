import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { VscAccount } from 'react-icons/vsc'
import { useSelector } from 'react-redux'

export const Navbar = ({setShowModal}) => {
  const { currentUser, token} = useSelector((state) => state.auth)
  return (
    <nav>
      <div className="flex justify-between w-full bg-purple-500 p-1 sticky top-0 z-10">
        <Link to="/home">
          <h1 className="text-2xl md:text-2xl font-bold text-white p-1 font-montserrat">
            Socials
          </h1>
        </Link>
        {
          token && (
            <div className="flex space-x-2 p-2 text-white">
              
            <button onClick={setShowModal}>
            <AiOutlineSearch className="flex w-6 h-6"/>
            </button>

            <Link to="/home">
              <AiOutlineHome className="flex w-6 h-6" />
            </Link>

  
            <Link to="/notifications">
              <IoIosNotificationsOutline className="flex w-6 h-6" />
            </Link>
   
              {currentUser && <Link to={`/${currentUser?.username}`}>
                <VscAccount className="flex w-6 h-6" />
              </Link>}
  
          </div>
          )
        }

      </div>
    </nav>
  )
}
