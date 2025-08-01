import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white flex items-center justify-center w-full">
      {/* Centered Container */}
      <div className="w-full max-w-6xl p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 animate-fade-in-down">
            All Bookings
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-between mt-2">
            <p className="text-gray-600 text-lg">Manage and view all event bookings</p>
            <div className="bg-orange-100/50 px-4 py-2 rounded-full mt-2 sm:mt-0">
              <span className="text-orange-600 font-medium">{appointments.length} Total Bookings</span>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-3xl shadow-2xl border border-orange-100/50 overflow-hidden w-full animate-slide-in-up">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 px-6 sm:px-8 py-5">
            <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 text-white font-semibold text-sm">
              <p>#</p>
              <p>Attendee</p>
              <p>Age</p>
              <p>Date & Time</p>
              <p>Organizer</p>
              <p>Ticket Price</p>
              <p>Action</p>
            </div>
          </div>

          {/* Table Body */}
          <div className="max-h-[65vh] overflow-y-auto">
            {appointments.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-orange-50/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <img className="w-10 h-10 opacity-50" src={assets.appointments_icon} alt="No bookings" />
                </div>
                <p className="text-gray-500 text-lg">No bookings found</p>
              </div>
            ) : (
              appointments.map((item, index) => (
                <div
                  className="flex flex-wrap justify-between max-sm:gap-3 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-4 px-6 sm:px-8 border-b border-orange-100 hover:bg-orange-50/50 transition-all duration-300 group"
                  key={index}
                  style={{
                    animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`
                  }}
                >
                  {/* Index */}
                  <p className="max-sm:hidden text-gray-400 font-medium">#{index + 1}</p>

                  {/* Attendee Info */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={item.userData.image}
                        className="w-10 h-10 rounded-full object-cover border-2 border-orange-200 group-hover:border-orange-400 transition-colors duration-300"
                        alt="Attendee"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                        {item.userData.name}
                      </p>
                      <p className="text-xs text-gray-500 sm:hidden">Age: {calculateAge(item.userData.dob)}</p>
                    </div>
                  </div>

                  {/* Age */}
                  <p className="max-sm:hidden text-gray-600">
                    <span className="bg-orange-50/50 px-2 py-1 rounded-full text-xs">
                      {calculateAge(item.userData.dob)}y
                    </span>
                  </p>

                  {/* Date & Time */}
                  <div className="text-sm">
                    <p className="font-medium text-gray-800">{slotDateFormat(item.slotDate)}</p>
                    <p className="text-gray-500">{item.slotTime}</p>
                  </div>

                  {/* Organizer Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={item.docData.image}
                      className="w-10 h-10 rounded-full object-cover bg-orange-50/50 border-2 border-orange-200 group-hover:border-orange-400 transition-colors duration-300"
                      alt="Organizer"
                    />
                    <div>
                      <p className="font-medium text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                        {item.docData.name}
                      </p>
                      <p className="text-xs text-gray-500">{item.docData.speciality}</p>
                    </div>
                  </div>

                  {/* Ticket Price */}
                  <p className="font-semibold text-orange-600">
                    {currency}{item.amount}
                  </p>

                  {/* Status/Action */}
                  <div className="flex justify-center">
                    {item.cancelled ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                        Completed
                      </span>
                    ) : (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="p-2 rounded-full hover:bg-red-100 transition-colors duration-300 group/btn"
                        title="Cancel Booking"
                      >
                        <img
                          className="w-6 h-6 group-hover/btn:scale-110 transition-transform duration-300"
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
            <div className="bg-orange-50/30 px-6 sm:px-8 py-4 border-t border-orange-100">
              <p className="text-gray-600 text-sm">
                Showing {appointments.length} booking{appointments.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>

        {/* Add custom CSS for animations */}
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fade-in-down {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slide-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  )
}

export default AllAppointments

