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
    <div className="flex justify-between items-center px-4 sm:px-8 lg:px-16 py-3 bg-white border-b border-green-100/30 shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <h1
          onClick={() => navigate('/')}
          className="text-xl sm:text-2xl font-semibold text-green-800 cursor-pointer hover:text-green-900 transition-colors duration-200"
        >
          EnergiPort
        </h1>
        <p className="border border-green-200/50 px-2 py-0.5 rounded-full text-xs sm:text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 transition-colors duration-200">
          {aToken ? 'Admin' : 'Station Operator'}
        </p>
      </div>
      <button
        onClick={() => logout()}
        className="bg-green-600 text-white text-sm sm:text-base font-medium px-6 sm:px-8 py-2 rounded-full hover:bg-green-700 hover:shadow-md transition-all duration-200"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar