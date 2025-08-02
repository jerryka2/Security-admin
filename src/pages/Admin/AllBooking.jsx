import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllBookings = () => {
  const { aToken, appointments = [], cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat = (date) => date, calculateAge = () => 'N/A', currency = '$' } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center w-full">
      {/* Centered Container */}
      <div className="w-full max-w-4xl p-4 sm:p-6">
        {/* Header Section */}
        <div className="mb-5 text-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-green-900">
            Charging Station Bookings
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-between mt-2">
            <p className="text-gray-600 text-sm">View and manage all bookings for EnergiPort stations</p>
            <div className="bg-green-100/50 px-2 py-1 rounded-lg mt-2 sm:mt-0">
              <span className="text-green-700 font-medium">{appointments.length} Bookings</span>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl border border-green-100/20 shadow-sm overflow-hidden w-full">
          {/* Table Header */}
          <div className="bg-green-700 px-3 sm:px-4 py-2.5">
            <div className="hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] gap-2 text-white font-medium text-xs">
              <p>#</p>
              <p>User</p>
              <p>Age</p>
              <p>Date & Time</p>
              <p>Station</p>
              <p>Cost</p>
              <p>Action</p>
            </div>
          </div>

          {/* Table Body */}
          <div className="max-h-[70vh] overflow-y-auto">
            {appointments.length === 0 ? (
              <div className="text-center py-10">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <img className="w-6 h-6 opacity-60" src={assets.appointments_icon} alt="No bookings" />
                </div>
                <p className="text-gray-500 text-sm">No bookings found</p>
              </div>
            ) : (
              appointments.map((item, index) => (
                <div
                  className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] items-center text-gray-600 py-2.5 px-3 sm:px-4 border-b border-green-100/50 hover:bg-green-50/50 transition-colors duration-150"
                  key={item._id || index}
                >
                  {/* Index */}
                  <p className="max-sm:hidden text-gray-400 text-xs font-medium">#{index + 1}</p>

                  {/* User Info */}
                  <div className="flex items-center gap-2">
                    <img
                      src={item.userData?.image || assets.default_user_icon}
                      className="w-7 h-7 rounded-full object-cover border border-green-200/50"
                      alt="User"
                      onError={(e) => (e.target.src = assets.default_user_icon)}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {item.userData?.name || 'Unknown User'}
                      </p>
                      <p className="text-xs text-gray-500 sm:hidden">
                        Age: {item.userData?.dob ? calculateAge(item.userData.dob) : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Age */}
                  <p className="max-sm:hidden text-gray-600">
                    <span className="bg-green-50/50 px-1.5 py-0.5 rounded-lg text-xs">
                      {item.userData?.dob ? calculateAge(item.userData.dob) : 'N/A'}y
                    </span>
                  </p>

                  {/* Date & Time */}
                  <div className="text-xs">
                    <p className="font-medium text-gray-700">{item.slotDate ? slotDateFormat(item.slotDate) : 'N/A'}</p>
                    <p className="text-gray-500">{item.slotTime || 'N/A'}</p>
                  </div>

                  {/* Station Info */}
                  <div className="flex items-center gap-2">
                    <img
                      src={item.docData?.image || assets.default_station_icon}
                      className="w-7 h-7 rounded-full object-cover border border-green-200/50"
                      alt="Station"
                      onError={(e) => (e.target.src = assets.default_station_icon)}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {item.docData?.name || 'Unknown Station'}
                      </p>
                      <p className="text-xs text-gray-500">{item.docData?.speciality || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Cost */}
                  <p className="text-sm font-medium text-green-700">
                    {currency}{item.amount ?? '0'}
                  </p>

                  {/* Status/Action */}
                  <div className="flex justify-center">
                    {item.cancelled ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-red-50 text-red-600">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1"></span>
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-green-50 text-green-600">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                        Completed
                      </span>
                    ) : (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="p-1 rounded-full hover:bg-red-50 transition-colors duration-150"
                        title="Cancel Booking"
                        disabled={!item._id}
                      >
                        <img
                          className="w-4 h-4"
                          src={assets.cancel_icon}
                          alt="Cancel"
                        />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with total count */}
          {appointments.length > 0 && (
            <div className="bg-green-50/50 px-3 sm:px-4 py-2 border-t border-green-100/50">
              <p className="text-gray-600 text-xs">
                Showing {appointments.length} booking{appointments.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllBookings