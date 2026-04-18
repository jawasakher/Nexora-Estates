import React from 'react'
import{Link} from 'react-router-dom'
import{assets} from '../assets/data'

const Header = () => {
  return (
    <header>

    <div>
      {/*Container */}
      <div>
        {/** Logo */}
        <div>
            <Link to={'/'}>
            <img src={assets.logoImg} alt="LogoImg" className='h-11'/>

            </Link>
            </div>
            {/*Nabar */}
            <Navbar/>
            {/*Button  & Profile*/}
            <div>

            </div>
      </div>
    </div>
    </header>
  )
}

export default Header

