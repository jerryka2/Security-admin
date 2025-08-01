import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { AdminContext } from './context/AdminContext';
import { AppContext } from './context/AppContext';
import { DoctorContext } from './context/StationContext';
import AddDoctor from './pages/Admin/AddStation';
import AllAppointments from './pages/Admin/AllBooking';
import AuditLog from './pages/Admin/AuditLog';
import Dashboard from './pages/Admin/Dashboard';
import DoctorsList from './pages/Admin/StationsList';
import DoctorAppointments from './pages/Station/StationAppointments';
import DoctorDashboard from './pages/Station/StationDashboard';
import DoctorProfile from './pages/Station/StationProfile';
import Login from './pages/Login';

const App = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)
  const { loading } = useContext(AppContext)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      {dToken || aToken ? (
        <div className='bg-[#F8F9FD]'>
          <ToastContainer />
          <Navbar />
          <div className='flex items-start'>
            <Sidebar />
            <Routes>
              <Route path='/' element={<></>} />
              <Route path='/admin-dashboard' element={<Dashboard />} />
              <Route path='/all-appointments' element={<AllAppointments />} />
              <Route path='/add-doctor' element={<AddDoctor />} />
              <Route path='/doctor-list' element={<DoctorsList />} />
              <Route path='/audit-log' element={<AuditLog />} />
              <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
              <Route path='/doctor-appointments' element={<DoctorAppointments />} />
              <Route path='/doctor-profile' element={<DoctorProfile />} />
            </Routes>
          </div>
        </div>
      ) : (
        <>
          <ToastContainer />
          <Login />
        </>
      )}
    </ErrorBoundary>
  )
}

export default App

