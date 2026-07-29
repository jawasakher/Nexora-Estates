import React from 'react'
import {useAppContext} from '../../context/AppContext.jsx'
import {assets} from '../../assets/data.js'
import {Link, NavLink, Outlet} from 'react-router-dom'
import {UserButton} from "@clerk/clerk-react"
import { useI18n } from '../../i18n/I18nContext.jsx'

const Sidebar = () => {
  const { t } = useI18n()
  const { user } = useAppContext();

  const navItems = [
    {
      path:"/owner",
      label:t('owner.sidebar.dashboard'),
      icon:assets.dashboard
    },
    {
       path:"/owner/add-property",
      label:t('owner.sidebar.addProperty'),
      icon:assets.housePlus
    },
     {
       path:"/owner/list-property",
      label:t('owner.sidebar.listProperty'),
      icon:assets.list
    },
    
  ]
  return (
    <div className='bg-linear-to-r from-[#fffbee] to-white'>
      <div className="mx-auto max-w-360 flex flex-col md:flex-row">
        {/** sidebar */}
        <div className="max-md:flexCenter flex flex-col justify-between bg-white sm:m-3 md:min-w-[20%] md:min-h-[97vh] rounded-xl shadow">
          <div className="flex flex-col gap-y-6 max-md:items-center md:flex-col md:pt-5">
            {/** logo & profile */}
            <div className="w-full flex justify-between md:flex-col">
              <div className="flex flex-1 p-3 lg:pl-8">
                <Link to={'/owner'}>
                <img src={assets.logoImg} alt="" className="h-11"/>
                </Link>
                </div>
                <div className="md:hidden flex items-center gap-3 md:bg-primary rounded-b-xl p-2 pl-5 lg:pl-10 md:mt-10">
                    <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: "45px",
                        height: "45px",
                      },
                    },
                  }}
                  />
                <div className="text-sm font-semilbold text-gray-800 capitalize">
                  {user?.firstName} {user?.lastName}
                </div>
                </div>
        </div>
        <div className='flex md:flex-col md:gap-x-5 gap-y-8 md:mt-4'>
          {navItems.map(link => (
            <NavLink 
            key={link.label}
            to={link.path}
            end={link.path === "/owner"}
            className={({isActive}) => isActive ? "flexStart gap-x-2 p-5 lg:pl-12 bold-13 sm:text-sm! cursor-pointer h-10 bg-secondary/10 max-md:border-b-4 md:border-r-4 border-r-4 border-secondary" : "flexStart gap-x-2 p-5 lg:pl-12 bold-13 sm:text-sm! cursor-pointer h-10 rounded-xl"}
            >
              <img  
              src={link.icon} 
              alt={link.label} 
              className='hidden md:block' 
              width={18}
              />

              <div>{link.label}</div>
            </NavLink>
          ))}
        </div>
    </div>
    <div className="hidden md:flex items-center gap-3 md:bg-primary md:border-t border-slate-900/15 rounded-b-xl p-2 pl-5 lg:pl-10 md:mt-10" >
      <UserButton
                  
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: "45px",
                        height: "45px",
                      },
                    },
                  }}
                />
                <div className="text-sm font-semilbold text-gray-800 capitalize">
                  {user?.firstName} {user?.lastName}
                </div>
    </div>

    </div>
        <div className="flex-1 sm:m-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar
