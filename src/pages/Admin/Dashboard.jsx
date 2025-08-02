import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData = {} } = useContext(AdminContext)
  const { slotDateFormat = (date) => date } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center w-full">
      {/* Centered Container */}
      <div className="w-full max-w-5xl p-6 sm:p-8 ml-14 md:ml-64">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-900">
            EnergiPort Dashboard
          </h1>
          <p className="text-gray-600 text-base mt-2">Overview of your charging network’s performance today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Stations Card */}
          <div className="bg-white p-6 rounded-xl border border-green-100/50 shadow-sm hover:border-green-200 transition-colors duration-150 flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold text-green-700">{dashData.doctors ?? 0}</p>
              <p className="text-gray-600 text-sm mt-1">Total Stations</p>
            </div>
            <div className="bg-green-100/50 p-3 rounded-lg">
              <img className="w-8 h-8" src={assets.station_icon || assets.appointments_icon} alt="Stations" />
            </div>
          </div>

          {/* Bookings Card */}
          <div className="bg-white p-6 rounded-xl border border-green-100/50 shadow-sm hover:border-green-200 transition-colors duration-150 flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold text-green-700">{dashData.appointments ?? 0}</p>
              <p className="text-gray-600 text-sm mt-1">Total Bookings</p>
            </div>
            <div className="bg-green-100/50 p-3 rounded-lg">
              <img className="w-8 h-8" src={assets.appointments_icon} alt="Bookings" />
            </div>
          </div>

          {/* Users Card */}
          <div className="bg-white p-6 rounded-xl border border-green-100/50 shadow-sm hover:border-green-200 transition-colors duration-150 flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold text-green-700">{dashData.patients ?? 0}</p>
              <p className="text-gray-600 text-sm mt-1">Total Users</p>
            </div>
            <div className="bg-green-100/50 p-3 rounded-lg">
              <img className="w-8 h-8" src={assets.default_user_icon || assets.appointments_icon} alt="Users" />
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white rounded-xl border border-green-100/50 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-green-700 px-4 sm:px-6 py-3">
            <div className="flex items-center gap-3">
              <img className="w-6 h-6 opacity-80" src={assets.appointments_icon} alt="Bookings" />
              <h3 className="text-white font-semibold text-lg">Recent Charging Bookings</h3>
            </div>
          </div>

          {/* Bookings List */}
          <div className="divide-y divide-green-100/50">
            {(dashData.latestAppointments || []).slice(0, 5).map((item, index) => (
              <div
                className={`flex items-center px-4 sm:px-6 py-4 ${index % 2 === 0 ? 'bg-white' : 'bg-green-50/30'} hover:bg-green-100/50 transition-colors duration-150`}
                key={item._id || index}
              >
                {/* Station Image */}
                <div className="flex-shrink-0">
                  <img
                    className="w-10 h-10 rounded-full object-cover border border-green-200/50"
                    src={item.docData?.image || assets.default_station_icon}
                    alt="Station"
                    onError={(e) => (e.target.src = assets.default_station_icon)}
                  />
                </div>

                {/* Booking Info */}
                <div className="flex-1 ml-4">
                  <p className="text-base font-medium text-gray-900">
                    {item.docData?.name || 'Unknown Station'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Booked on {item.slotDate ? slotDateFormat(item.slotDate) : 'N/A'}
                  </p>
                </div>

                {/* Status/Action */}
                <div className="ml-4 flex-shrink-0">
                  {item.cancelled ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-red-50 text-red-600">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-green-50 text-green-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                      Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="p-2 rounded-full hover:bg-red-50 transition-colors duration-150"
                      title="Cancel Booking"
                      disabled={!item._id}
                    >
                      <img
                        className="w-5 h-5"
                        src={assets.cancel_icon}
                        alt="Cancel"
                      />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Empty State */}
            {(!dashData.latestAppointments || dashData.latestAppointments.length === 0) && (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <img className="w-6 h-6 opacity-60" src={assets.appointments_icon} alt="No bookings" />
                </div>
                <p className="text-gray-600 text-sm">No recent bookings</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard