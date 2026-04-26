import  React,{ useState, useEffect } from "react"
import{Link, useLocation } from 'react-router-dom'
import{assets} from '../assets/data'
import Navbar from './Navbar'



const Header = () => {

  const [active, setActive] = useState(false)
  const [menuOpened, setMenuOpened] = useState(false)
  const [showSearch, setshowSearch] = useState(false)
  const location = useLocation()


  const toggleMenu = () => 
    setMenuOpened((prev) => !prev);
    

  useEffect(() => {
    const handleScroll =() => {
    if (location.pathname === "/") {
      setActive(window.scrollY  > 10);
    } else {
      setActive(true); // always stay active on other pages
    }
    if(window.scrollY > 10){
      setMenuOpened(false);
    }
  };



  window.addEventListener("scroll", handleScroll);
  // Run once to set the initial state based on the current scroll position
  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };

  }, [location.pathname ]);

  return (
    <header className={ `${active ? "bg-white/95 backdrop-blur-md py-3 shadow-lg shadow-black/5" : "py-4"} fixed top-0 w-full left-0 right-0 z-50 transition-all duration-300`}>

    <div className='max-padd-container'>
      {/*Container */}
      <div className='flexBetween'>
        {/** Logo */}
        <div className=' flex flex-1'>
            <Link to={'/'}>
          <img src={assets.logoImg} alt="LogoImg" className={`${!active ? "invert" : ""} h-20 transition-all duration-200`}/>

            </Link>
            </div>
            {/*Nabar */}
            <Navbar
              
            active={active}
            setMenuOpened={setMenuOpened}
            containerStyles={`${
              menuOpened ? " flex items-start flex-col ga-y-8 fixed top-16 right-6 p-5 bg-white shadow-md w-52 ring-1 ring-slate-900/5 rounded-xl z-50"
              : " hidden lg:flex gap-x-5 xl:gap-x-1 medium-15 p-1 "
            }${!menuOpened && !active ? "text-white" : ""}`}
              
        />
            {/*Buttons SearchBar  & Profile*/}
            <div className='flex sm:flex-1 items-center sm:justify-end gap-x-3 sm:gap-x-6'>
              {/** SearchBar */}  
            <div className='relative hidden sm:flex items-center'>
              <div
                className={`${
                  active ? "bg-primary/80" : "bg-white/90"
                } transition-all duration-500 ease-out ring-1 ring-slate-900/10 rounded-full overflow-hidden shadow-sm ${
                  showSearch
                    ? "w-[300px] opacity-100 pr-2 pl-4 py-2.5"
                    : "w-[148px] opacity-100 pl-3 pr-2 py-2"
                }`}
              >
                <div className='flex items-center gap-2'>
                  <img src={assets.search} alt="searchIcon" className='size-4 opacity-60'/>
                  {showSearch && (
                    <input
                      type="text"
                      placeholder="Search areas, properties..."
                      className="w-full text-sm outline-none bg-transparent placeholder:text-gray-400"
                    />
                  )}
                </div>
              </div>

              <button
                type='button'
                onClick={() => setshowSearch((prev) => !prev)}
                className='absolute right-1 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-secondary to-tertiary px-3.5 py-1.5 text-[12px] font-semibold text-black ring-1 ring-slate-900/10 shadow-md shadow-secondary/30 cursor-pointer'
              >
                <img src={assets.search} alt="searchIcon" className='size-3.5'/>
                <span>{showSearch ? "Close" : "Search"}</span>
              </button>
            </div>
            {/** Menu Togggle  */}
            <>
            {menuOpened ? (
              <img src={assets.close} 
              alt="CloseMenuIcon"
              onClick={toggleMenu}
              className={`${
              !active && "invert"
              } lg:hidden cursor-pointer text-xl`}
              />
            ):(
              <img 
              src={assets.menu} 
              alt="openMenuIcon" 
              onClick={toggleMenu} 
              className={`${
              !active && "invert"
            } lg:hidden cursor-pointer text-xl`}
            />
            )}
            </>
            {/** User Profile */}
            <div>
                {/** User */}
                  <div>
                    <div>
                        <button className='btn-secondary flexCenter gap-2 rounded-full shadow-md shadow-secondary/20 hover:scale-[1.02] transition-transform'>
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

