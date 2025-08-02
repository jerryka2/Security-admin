import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/StationContext'

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <div className="min-h-screen bg-white border-r border-green-100/30 w-14 md:w-60 fixed top-0 left-0 z-40 shadow-sm">
      <div className="flex items-center justify-center py-4 border-b border-green-100/30">
        <h2 className="text-lg md:text-xl font-semibold text-green-800 hidden md:block">
          EnergiPort
        </h2>
      </div>
      {aToken && (
        <ul className="text-gray-600 mt-4">
          <NavLink
            to={'/admin-dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2.5 px-3 md:px-6 cursor-pointer transition-colors duration-200 hover:bg-green-50 hover:text-green-700 ${
                isActive ? 'bg-green-100/80 border-r-4 border-green-600 text-green-700' : ''
              }`
            }
          >
            <img className="w-5 h-5" src={assets.home_icon} alt="Dashboard" />
            <p className="hidden md:block text-sm font-medium">Dashboard</p>
          </NavLink>
          <NavLink
            to={'/all-appointments'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2.5 px-3 md:px-6 cursor-pointer transition-colors duration-200 hover:bg-green-50 hover:text-green-700 ${
                isActive ? 'bg-green-100/80 border-r-4 border-green-600 text-green-700' : ''
              }`
            }
          >
            <img className="w-5 h-5" src={assets.appointment_icon} alt="Bookings" />
            <p className="hidden md:block text-sm font-medium">Bookings</p>
          </NavLink>
          <NavLink
            to={'/add-doctor'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2.5 px-3 md:px-6 cursor-pointer transition-colors duration-200 hover:bg-green-50 hover:text-green-700 ${
                isActive ? 'bg-green-100/80 border-r-4 border-green-600 text-green-700' : ''
              }`
            }
          >
            <img className="w-5 h-5" src={assets.add_icon} alt="Add Operator" />
            <p className="hidden md:block text-sm font-medium">Add Operator</p>
          </NavLink>
          <NavLink
            to={'/doctor-list'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2.5 px-3 md:px-6 cursor-pointer transition-colors duration-200 hover:bg-green-50 hover:text-green-700 ${
                isActive ? 'bg-green-100/80 border-r-4 border-green-600 text-green-700' : ''
              }`
            }
          >
            <img className="w-5 h-5" src={assets.people_icon} alt="Operators List" />
            <p className="hidden md:block text-sm font-medium">Operators List</p>
          </NavLink>
          <NavLink
            to={'/audit-log'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2.5 px-3 md:px-6 cursor-pointer transition-colors duration-200 hover:bg-green-50 hover:text-green-700 ${
                isActive ? 'bg-green-100/80 border-r-4 border-green-600 text-green-700' : ''
              }`
            }
          >
            <img className="w-5 h-5" src={assets.list_icon} alt="Audit Log" />
            <p className="hidden md:block text-sm font-medium">Audit Log</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className="text-gray-600 mt-4">
          <NavLink
            to={'/doctor-dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2.5 px-3 md:px-6 cursor-pointer transition-colors duration-200 hover:bg-green-50 hover:text-green-700 ${
                isActive ? 'bg-green-100/80 border-r-4 border-green-600 text-green-700' : ''
              }`
            }
          >
            <img className="w-5 h-5" src={assets.home_icon} alt="Dashboard" />
            <p className="hidden md:block text-sm font-medium">Dashboard</p>
          </NavLink>
          <NavLink
            to={'/doctor-appointments'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2.5 px-3 md:px-6 cursor-pointer transition-colors duration-200 hover:bg-green-50 hover:text-green-700 ${
                isActive ? 'bg-green-100/80 border-r-4 border-green-600 text-green-700' : ''
              }`
            }
          >
            <img className="w-5 h-5" src={assets.appointment_icon} alt="Bookings" />
            <p className="hidden md:block text-sm font-medium">Bookings</p>
          </NavLink>
          <NavLink
            to={'/doctor-profile'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2.5 px-3 md:px-6 cursor-pointer transition-colors duration-200 hover:bg-green-50 hover:text-green-700 ${
                isActive ? 'bg-green-100/80 border-r-4 border-green-600 text-green-700' : ''
              }`
            }
          >
            <img className="w-5 h-5" src={assets.people_icon} alt="Profile" />
            <p className="hidden md:block text-sm font-medium">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar