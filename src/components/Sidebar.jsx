import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/EventContext'

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <div className="min-h-screen bg-white border-r border-orange-100/50 w-14 md:w-64 fixed top-0 left-0 z-40 shadow-sm">
      <div className="flex items-center justify-center py-5 border-b border-orange-100/50">
        <h2 className="text-lg md:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 animate-fade-in-down hidden md:block">
          EventSphere
        </h2>
      </div>
      {aToken && (
        <ul className="text-gray-600 mt-5">
          <NavLink
            to={'/admin-dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-7 cursor-pointer transition-all duration-300 hover:bg-orange-50/50 hover:text-orange-600 ${
                isActive ? 'bg-orange-100/80 border-r-4 border-orange-500 text-orange-600' : ''
              }`
            }
          >
            <img className="w-5 h-5" src={assets.home_icon} alt="Dashboard" />
            <p className="hidden md:block text-sm font-semibold">Dashboard</p>
          </NavLink>
          <NavLink
            to={'/all-appointments'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-7 cursor-pointer transition-all duration-300 hover:bg-orange-50/50 hover:text-orange-600 ${
                isActive ? 'bg-orange-100/80 border-r-4 border-orange-500 text-orange-600' : ''
              }`
            }
          >
            <img className="w-5 h-5" src={assets.appointment_icon} alt="Bookings" />
            <p className="hidden md:block text-sm font-semibold">Bookings</p>
          </NavLink>
          <NavLink
            to={'/add-doctor'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-7 cursor-pointer transition-all duration-300 hover:bg-orange-50/50 hover:text-orange-600 ${
                isActive ? 'bg-orange-100/80 border-r-4 border-orange-500 text-orange-600' : ''
              }`
            }
          >
            <img className="w-5 h-5" src={assets.add_icon} alt="Add Organizer" />
            <p className="hidden md:block text-sm font-semibold">Add Organizer</p>
          </NavLink>
          <NavLink
            to={'/doctor-list'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-7 cursor-pointer transition-all duration-300 hover:bg-orange-50/50 hover:text-orange-600 ${
                isActive ? 'bg-orange-100/80 border-r-4 border-orange-500 text-orange-600' : ''
              }`
            }
          >
            <img className="w-5 h-5" src={assets.people_icon} alt="Organizers List" />
            <p className="hidden md:block text-sm font-semibold">Organizers List</p>
          </NavLink>
          <NavLink
            to={'/audit-log'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-7 cursor-pointer transition-all duration-300 hover:bg-orange-50/50 hover:text-orange-600 ${
                isActive ? 'bg-orange-100/80 border-r-4 border-orange-500 text-orange-600' : ''
              }`
            }
          >
            <img className="w-5 h-5" src={assets.list_icon} alt="Audit Log" />
            <p className="hidden md:block text-sm font-semibold">Audit Log</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className="text-gray-600 mt-5">
          <NavLink
            to={'/doctor-dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-7 cursor-pointer transition-all duration-300 hover:bg-orange-50/50 hover:text-orange-600 ${
                isActive ? 'bg-orange-100/80 border-r-4 border-orange-500 text-orange-600' : ''
              }`
            }
          >
            <img className="w-5 h-5" src={assets.home_icon} alt="Dashboard" />
            <p className="hidden md:block text-sm font-semibold">Dashboard</p>
          </NavLink>
          <NavLink
            to={'/doctor-appointments'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-7 cursor-pointer transition-all duration-300 hover:bg-orange-50/50 hover:text-orange-600 ${
                isActive ? 'bg-orange-100/80 border-r-4 border-orange-500 text-orange-600' : ''
              }`
            }
          >
            <img className="w-5 h-5" src={assets.appointment_icon} alt="Bookings" />
            <p className="hidden md:block text-sm font-semibold">Bookings</p>
          </NavLink>
          <NavLink
            to={'/doctor-profile'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-7 cursor-pointer transition-all duration-300 hover:bg-orange-50/50 hover:text-orange-600 ${
                isActive ? 'bg-orange-100/80 border-r-4 border-orange-500 text-orange-600' : ''
              }`
            }
          >
            <img className="w-5 h-5" src={assets.people_icon} alt="Profile" />
            <p className="hidden md:block text-sm font-semibold">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar