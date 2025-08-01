import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/StationContext'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className="flex justify-between items-center px-6 sm:px-12 lg:px-20 py-4 bg-white border-b border-orange-100/50 shadow-sm sticky top-0 z-50 animate-fade-in-down">
      <div className="flex items-center gap-3">
        <h1
          onClick={() => navigate('/')}
          className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          EventVibe
        </h1>
        <p className="border border-orange-200/60 px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-orange-600 bg-orange-50/50 hover:bg-orange-100 transition-all duration-300">
          {aToken ? 'Admin' : 'Event Organizer'}
        </p>
      </div>
      <button
        onClick={() => logout()}
        className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-sm sm:text-base font-semibold px-8 sm:px-10 py-2.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar

