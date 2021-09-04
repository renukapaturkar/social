
import React from 'react'
import {Link} from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-between w-full bg-purple-500 p-1 sticky top-0 z-10">
        <Link to="/"><h1 className="text-2xl md:text-2xl font-bold text-white p-1 font-montserrat">Socials</h1></Link>
        <div className="flex space-x-2 p-2">
          <Link to="/login">Login</Link>

        </div>
      </div>
    </nav>
  )
}
