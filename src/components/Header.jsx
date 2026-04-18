import React from 'react'
import{Link} from 'react-router-dom'
import{assets} from '../assets/data'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className=''>

    <div className='max-padd-container'>
      {/*Container */}
      <div className='flexBetween'>
        {/** Logo */}
        <div className='flex-1'>
            <Link to={'/'}>
            <img src={assets.logoImg} alt="LogoImg" className='h-20'/>

            </Link>
            </div>
            {/*Nabar */}
            <Navbar/>
            {/*Buttons SearchBar  & Profile*/}
            <div className='flex sm:flex-1 items-center sm:justify-end gap-x-4 sm:gap-x-8'>
              {/** SearchBar */}  
            <div>
            SearchBar
            </div>
            {/** Menu Togggle  */}
            <>
            MenuBtn
            </>
            {/** User Profile */}
            <div>
                {/** User */}
                  <div>
                    <div>
                        <button className='btn-secondary flexCenter gap-2 rounded-full'>
                            Login
                            <img src={assets.user} alt="userIcon"/>
                        </button>
                    </div>
                  </div>
            </div>
            </div>
      </div>
    </div>
    </header>
  )
}

export default Header

