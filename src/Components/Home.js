import React from 'react'
import Sidebar from './Sidebar'
import "./Home.css";
function Home({currentUser,signOut, themeChanger}) {
  return (
    <div className='home'>
        <div className='home-container'>
          {/* sidebar */}
          <Sidebar currentUser={currentUser} signOut={signOut}/>
          {/* a container with whs app logo */}
          <div className='home-bg'>
   
            <img src='./WhatsAppbg.png' alt='logo'/>
         
          </div>
        </div>
    </div>
  )
}

export default Home