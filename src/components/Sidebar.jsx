import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { useStateContext } from '../contexts/ContextProvider';
import { links } from '../data/dummy'
// import of links from dummy data sets up the sidebar
// links is an array containing objects
// each object item contains a title > sidebar subheading
// and an array of links > links within each subheading
// each link contains a name and an icon component


const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();


  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false)
    }
  }

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2'

  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
      
      {activeMenu && (<>
        <div className='flex justify-between items-center'>

          {/* Sidebar Title */}
          <Link
            to="/"
            onClick={handleCloseSideBar}
            className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
            <SiShopware
            />
            <span>Shoppy</span>
          </Link>
          {/* Exit Sidebar sm */}
          <TooltipComponent content="Menu" position="BottomCenter">
            <button
              type="button"
              onClick={() => { setActiveMenu((prevActiveState) => !prevActiveState) }}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </TooltipComponent>
        </div>
        {/* Subheading and links container */}
        <div className='mt-10'>
          {/* Map through each object in links array to create subheading with title */}
          {links.map((item) => (
            <div key={item.title}>
              <p
                className='text-gray-400 m-3 mt-4 uppercase'
              >
                {item.title}
              </p>
              {/* Map through each link in links array to cretae Navlink */}
              {item.links.map((link) => (
                <NavLink
                  to={`/${link.name}`}
                  key={link.name}
                  onClick={handleCloseSideBar}
                  className={({ isActive }) => isActive ? activeLink : normalLink}
                >{link.icon}
                  <span className='capitalize'>
                    {link.name}
                  </span>
                </NavLink>
              ))}
            </div>
          ))}
      </div>
      </>)}

    </div>
  )
}

export default Sidebar