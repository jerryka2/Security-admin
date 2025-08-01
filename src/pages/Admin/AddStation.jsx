import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import apiClient from '../../services/apiClient'

const AddEvent = () => {
    const [eventImg, setEventImg] = useState(false)
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [location1, setLocation1] = useState('')
    const [location2, setLocation2] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Concert')
    const [ticketPrice, setTicketPrice] = useState('')
    const [capacity, setCapacity] = useState('')

    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!eventImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();
            formData.append('image', eventImg)
            formData.append('name', name)
            formData.append('date', date)
            formData.append('location', JSON.stringify({ line1: location1, line2: location2 }))
            formData.append('description', description)
            formData.append('category', category)
            formData.append('ticketPrice', Number(ticketPrice))
            formData.append('capacity', Number(capacity))

            // console log formdata
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            const { data } = await apiClient.post('/api/admin/add-event', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                setEventImg(false)
                setName('')
                setDate('')
                setLocation1('')
                setLocation2('')
                setDescription('')
                setTicketPrice('')
                setCapacity('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white flex items-center justify-center w-full">
            {/* Centered Container */}
            <div className="w-full max-w-3xl p-6 sm:p-8">
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 animate-fade-in-down">
                        Create New Event
                    </h1>
                    <p className="text-gray-600 text-lg mt-2">Add a new event to your platform</p>
                </div>

                <form onSubmit={onSubmitHandler} className="w-full">
                    <div className="bg-white rounded-3xl shadow-2xl border border-orange-100/50 overflow-hidden animate-slide-in-up">
                        {/* Form Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-pink-500 px-6 sm:px-8 py-5">
                            <h3 className="text-white font-semibold text-xl sm:text-2xl">Event Details</h3>
                        </div>

                        {/* Form Content */}
                        <div className="p-6 sm:p-8">
                            {/* Image Upload Section */}
                            <div className="flex items-center gap-5 mb-8 p-5 bg-orange-50/50 rounded-xl border-2 border-dashed border-orange-200 hover:border-orange-300 transition-colors duration-300">
                                <label htmlFor="event-img" className="cursor-pointer group">
                                    <div className="relative">
                                        <img
                                            className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg object-cover border-3 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                                            src={eventImg ? URL.createObjectURL(eventImg) : assets.upload_area}
                                            alt="Event"
                                        />
                                        <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full p-2 shadow-md group-hover:bg-pink-500 transition-all duration-300">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                                                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                                            </svg>
                                        </div>
                                    </div>
                                </label>
                                <input onChange={(e) => setEventImg(e.target.files[0])} type="file" id="event-img" hidden />
                                <div>
                                    <p className="text-gray-700 font-medium text-base sm:text-lg">Upload Event Image</p>
                                    <p className="text-gray-500 text-sm">Choose a vibrant, event-themed image</p>
                                </div>
                            </div>

                            {/* Form Fields Grid */}
                            <div className="grid md:grid-cols-2 gap-6 text-gray-600">
                                {/* Left Column */}
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Event Name</label>
                                        <input
                                            onChange={e => setName(e.target.value)}
                                            value={name}
                                            className="w-full border border-orange-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-orange-50/30 shadow-sm hover:shadow-md transition-all duration-300"
                                            type="text"
                                            placeholder="Enter event name"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Event Date</label>
                                        <input
                                            onChange={e => setDate(e.target.value)}
                                            value={date}
                                            className="w-full border border-orange-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-orange-50/30 shadow-sm hover:shadow-md transition-all duration-300"
                                            type="datetime-local"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Location</label>
                                        <div className="space-y-3">
                                            <input
                                                onChange={e => setLocation1(e.target.value)}
                                                value={location1}
                                                className="w-full border border-orange-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-orange-50/30 shadow-sm hover:shadow-md transition-all duration-300"
                                                type="text"
                                                placeholder="Location Line 1"
                                                required
                                            />
                                            <input
                                                onChange={e => setLocation2(e.target.value)}
                                                value={location2}
                                                className="w-full border border-orange-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-orange-50/30 shadow-sm hover:shadow-md transition-all duration-300"
                                                type="text"
                                                placeholder="Location Line 2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Category</label>
                                        <select
                                            onChange={e => setCategory(e.target.value)}
                                            value={category}
                                            className="w-full border border-orange-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-orange-50/30 shadow-sm hover:shadow-md transition-all duration-300"
                                        >
                                            <option value="Concert">Concert</option>
                                            <option value="Conference">Conference</option>
                                            <option value="Wedding">Wedding</option>
                                            <option value="Festival">Festival</option>
                                            <option value="Workshop">Workshop</option>
                                            <option value="Exhibition">Exhibition</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Ticket Price</label>
                                        <input
                                            onChange={e => setTicketPrice(e.target.value)}
                                            value={ticketPrice}
                                            className="w-full border border-orange-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-orange-50/30 shadow-sm hover:shadow-md transition-all duration-300"
                                            type="number"
                                            placeholder="Enter ticket price"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Capacity</label>
                                        <input
                                            onChange={e => setCapacity(e.target.value)}
                                            value={capacity}
                                            className="w-full border border-orange-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-orange-50/30 shadow-sm hover:shadow-md transition-all duration-300"
                                            type="number"
                                            placeholder="Enter maximum capacity"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Description Section */}
                            <div className="mt-6 space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Event Description</label>
                                <textarea
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
                                    className="w-full border border-orange-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-orange-50/30 shadow-sm hover:shadow-md transition-all duration-300 resize-none"
                                    rows={4}
                                    placeholder="Describe the event - highlights, schedule, special features..."
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="mt-6 pt-5 border-t border-orange-100 text-center">
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    Create Event
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEvent