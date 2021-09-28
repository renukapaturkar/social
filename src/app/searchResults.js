import { useState } from "react"
import { useDispatch } from "react-redux"





export const SearchResults = ({setShowModal}) => {
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("idle")
    const dispatch = useDispatch()
    const [users, setUsers] = useState([])

    const onEnterPress = (e) => {
        if(e.key === "Enter"){
            handleSearch()
        }
    }

    const handleSearch = () => {

    }

    return(
        <div className="min-w-screen fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 ">
        <div
          className="absolute bg-black opacity-80 inset-0 z-0"
          onClick={() => setShowModal(false)}>

          </div>

              <div className="flex items-center space-x-1  cursor-pointer ">
                <input
                  type="text"
                  autoFocus={true}
                  className="text ring rounded-full text-1xl p-1 w-full"
                  placeholder="Search for a user"
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={onEnterPress}
                />
                <button
                  onClick={handleSearch}
                  className="focus:text-green-500">
                search</button>
              </div>
            </div>


    )
}