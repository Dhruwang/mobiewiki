import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const Navigate = useNavigate()
  const Logout=()=>{
    localStorage.removeItem('token')
    Navigate("/login")
  }
  return (
    <div className='sideBar' id='sideBar'>
      <div className='darkback'></div>
      <div className='leftSpace'></div>
      <div className='sideBarMain'>

        <div className='sideBarUpper p-4'>

          <Link to="/"><h2>MovieWiki</h2></Link>
          <hr></hr>
          <ul className='px-0'>
            <li><i class="bi bi-search "></i><Link to="/search"> Search</Link></li>
            <li><i class="bi bi-house " /><Link to="/"> Home</Link></li>
            <li><i class="bi bi-lightning "></i> <Link to="/trending"> Trending</Link></li>
            <li><i class="bi bi-camera-reels "></i><Link to="/genres"> Genres</Link></li>
            <li><i class="bi bi-collection-play "></i><Link> Series</Link></li>
            <li><i class="bi bi-heart "></i><Link> Favourites</Link></li>
          </ul>
          <hr></hr>
        </div>
        {localStorage.getItem('token')?<button onClick={Logout} className='align-self-end m-4 logoutbtn'><i class="bi bi-arrow-bar-left"></i> Logout</button>:<Link to="/login"><h5 className='align-self-end m-4'>Login / Signup</h5></Link>}
        
      </div>
    </div>
  )
}
