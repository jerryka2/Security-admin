import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white flex items-center justify-center w-full">
      {/* Centered Container */}
      <div className="w-full max-w-6xl p-6 sm:p-8 lg:p-12 ml-14 md:ml-64">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 animate-fade-in-down">
            All Organizers
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-between mt-2">
            <p className="text-gray-600 text-lg">Manage your event team and active status</p>
            <div className="bg-orange-100/50 px-4 py-2 rounded-full mt-2 sm:mt-0">
              <span className="text-orange-600 font-medium">{doctors.length} Total Organizers</span>
            </div>
          </div>
        </div>

        {/* Organizers Grid */}
        <div className="bg-white rounded-3xl shadow-2xl border border-orange-100/50 p-6 sm:p-8 animate-slide-in-up">
          {/* Grid Header */}
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Event Team</h3>
            <p className="text-gray-600 text-sm mt-1">Click on active status toggle to change organizer availability</p>
          </div>

          {/* Organizers Grid */}
          {doctors.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-orange-50/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl opacity-50">🎤</span>
              </div>
              <p className="text-gray-500 text-lg">No organizers found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {doctors.map((item, index) => (
                <div
                  className="bg-white border border-orange-100/50 rounded-3xl overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                  key={index}
                  style={{
                    animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Organizer Image */}
                  <div className="relative overflow-hidden">
                    <img
                      className="w-full h-48 object-cover bg-orange-50/50 group-hover:scale-110 transition-transform duration-500"
                      src={item.image}
                      alt={item.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Active Status Badge */}
                    <div className="absolute top-3 right-3">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        <span className={`w-2 h-2 rounded-full inline-block mr-1 ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {item.available ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                  </div>

                  {/* Organizer Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{item.speciality}</p>

                    {/* Experience & Fees */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span className="bg-orange-50/50 px-2 py-1 rounded-full">{item.experience}</span>
                      <span className="font-medium">${item.fees}</span>
                    </div>

                    {/* Active Status Toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Active Status</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          onChange={() => changeAvailability(item._id)}
                          type="checkbox"
                          checked={item.available}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer with statistics */}
          {doctors.length > 0 && (
            <div className="mt-8 pt-6 border-t border-orange-100">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-orange-50/50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{doctors.filter(doc => doc.available).length}</p>
                  <p className="text-orange-700 text-sm">Active Organizers</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-gray-600">{doctors.filter(doc => !doc.available).length}</p>
                  <p className="text-gray-700 text-sm">Inactive Organizers</p>
                </div>
                <div className="bg-pink-50/50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-pink-600">{doctors.length}</p>
                  <p className="text-pink-700 text-sm">Total Organizers</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add custom CSS for animations */}
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
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

export default DoctorsList

