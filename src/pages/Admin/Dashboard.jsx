import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white flex items-center justify-center w-full">
      {/* Centered Container */}
      <div className="w-full max-w-6xl p-6 sm:p-8 lg:p-12 ml-14 md:ml-64">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 animate-fade-in-down">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg mt-2">Welcome back! Here's what's happening with your event platform today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Organizers Card */}
          <div className="group bg-white p-6 rounded-3xl shadow-2xl border border-orange-100/50 cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors duration-300">{dashData.doctors}</p>
                <p className="text-gray-600 font-medium mt-2 text-lg">Total Organizers</p>
                <div className="w-16 h-1 bg-orange-500 rounded-full mt-3 group-hover:w-20 transition-all duration-300"></div>
              </div>
              <div className="bg-orange-100/50 p-4 rounded-full group-hover:bg-orange-200 transition-colors duration-300">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🎤</span>
              </div>
            </div>
          </div>

          {/* Bookings Card */}
          <div className="group bg-white p-6 rounded-3xl shadow-2xl border border-orange-100/50 cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold text-pink-600 group-hover:text-pink-700 transition-colors duration-300">{dashData.appointments}</p>
                <p className="text-gray-600 font-medium mt-2 text-lg">Total Bookings</p>
                <div className="w-16 h-1 bg-pink-500 rounded-full mt-3 group-hover:w-20 transition-all duration-300"></div>
              </div>
              <div className="bg-pink-100/50 p-4 rounded-full group-hover:bg-pink-200 transition-colors duration-300">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🎟️</span>
              </div>
            </div>
          </div>

          {/* Attendees Card */}
          <div className="group bg-white p-6 rounded-3xl shadow-2xl border border-orange-100/50 cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors duration-300">{dashData.patients}</p>
                <p className="text-gray-600 font-medium mt-2 text-lg">Total Attendees</p>
                <div className="w-16 h-1 bg-purple-500 rounded-full mt-3 group-hover:w-20 transition-all duration-300"></div>
              </div>
              <div className="bg-purple-100/50 p-4 rounded-full group-hover:bg-purple-200 transition-colors duration-300">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">👥</span>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white rounded-3xl shadow-2xl border border-orange-100/50 overflow-hidden animate-slide-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 px-6 sm:px-8 py-5">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <span className="text-xl">📋</span>
              </div>
              <h3 className="text-white font-semibold text-xl sm:text-2xl">Latest Bookings</h3>
            </div>
          </div>

          {/* Bookings List */}
          <div className="divide-y divide-orange-100">
            {dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div
                className="flex items-center px-6 sm:px-8 py-5 hover:bg-orange-50/50 transition-colors duration-300 group"
                key={index}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Organizer Image */}
                <div className="relative flex-shrink-0">
                  <img
                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-200 group-hover:border-orange-400 transition-colors duration-300"
                    src={item.docData.image}
                    alt="Organizer"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                {/* Booking Info */}
                <div className="flex-1 ml-5">
                  <p className="text-gray-800 font-medium group-hover:text-orange-600 transition-colors duration-300 text-lg">
                    {item.docData.name}
                  </p>
                  <p className="text-gray-500 mt-1 text-sm">
                    Booking on {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {/* Status/Action */}
                <div className="ml-5 flex-shrink-0">
                  {item.cancelled ? (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-700">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="p-2 rounded-full hover:bg-red-100 transition-colors duration-300 group/btn"
                      title="Cancel Booking"
                    >
                      <span className="text-xl group-hover/btn:scale-110 transition-transform duration-300">❌</span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Empty State */}
            {dashData.latestAppointments.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-orange-50/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl opacity-50">🎟️</span>
                </div>
                <p className="text-gray-500 text-lg">No recent bookings</p>
              </div>
            )}
          </div>
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

export default Dashboard