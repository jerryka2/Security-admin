import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import apiClient from '../../services/apiClient'

const AddStation = () => {
    const [stationImg, setStationImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('Level 2 Charger')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!stationImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();
            formData.append('image', stationImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            const { data } = await apiClient.post('/api/admin/add-doctor', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                setStationImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-green-50 to-teal-100 w-full flex justify-center'>
            {/* Compact Container with Max Width */}
            <div className='w-full max-w-md p-3'>
                {/* Header Section */}
                <div className='mb-3'>
                    <h1 className='text-xl font-bold text-teal-800 mb-0.5'>Add Station</h1>
                    <p className='text-teal-600 text-xs'>New EV charging station</p>
                </div>

                <form onSubmit={onSubmitHandler} className='w-full'>
                    <div className='bg-white rounded-md shadow-sm border border-teal-100 overflow-hidden'>
                        {/* Form Header */}
                        <div className='bg-gradient-to-r from-teal-600 to-green-500 px-3 py-2'>
                            <h3 className='text-white font-semibold text-sm'>Station Details</h3>
                        </div>

                        {/* Form Content */}
                        <div className='p-3 max-h-[80vh] overflow-y-auto'>
                            {/* Image Upload Section */}
                            <div className='flex items-center gap-2 mb-3 p-2 bg-teal-50 rounded-md border border-teal-200 hover:border-teal-400 transition-colors duration-200'>
                                <label htmlFor="station-img" className='cursor-pointer group'>
                                    <div className='relative'>
                                        <img
                                            className='w-10 h-10 bg-gray-100 rounded-full object-cover border border-white shadow-sm group-hover:scale-105 transition-transform duration-200'
                                            src={stationImg ? URL.createObjectURL(stationImg) : assets.upload_area}
                                            alt="Station Image"
                                        />
                                        <div className='absolute -bottom-0.5 -right-0.5 bg-teal-500 rounded-full p-0.5 shadow-sm group-hover:bg-teal-600 transition-colors duration-200'>
                                            <svg className='w-2.5 h-2.5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                                <path d='M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z' />
                                                <path d='M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z' />
                                            </svg>
                                        </div>
                                    </div>
                                </label>
                                <input onChange={(e) => setStationImg(e.target.files[0])} type="file" id="station-img" hidden />
                                <div>
                                    <p className='text-teal-700 font-medium text-xs'>Image</p>
                                    <p className='text-teal-500 text-[10px]'>Station photo</p>
                                </div>
                            </div>

                            {/* Form Fields - Single Column */}
                            <div className='grid grid-cols-1 gap-3 text-teal-700'>
                                <div className='space-y-0.5'>
                                    <label className='block text-[10px] font-medium text-teal-700'>Station Name</label>
                                    <input
                                        onChange={e => setName(e.target.value)}
                                        value={name}
                                        className='w-full border border-teal-300 rounded-md px-2 py-1 text-[10px] focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 bg-white placeholder-teal-300'
                                        type="text"
                                        placeholder='Name'
                                        required
                                    />
                                </div>

                                <div className='space-y-0.5'>
                                    <label className='block text-[10px] font-medium text-teal-700'>Contact Email</label>
                                    <input
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                        className='w-full border border-teal-300 rounded-md px-2 py-1 text-[10px] focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 bg-white placeholder-teal-300'
                                        type="email"
                                        placeholder='Email'
                                        required
                                    />
                                </div>

                                <div className='space-y-0.5'>
                                    <label className='block text-[10px] font-medium text-teal-700'>Access Password</label>
                                    <input
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                        className='w-full border border-teal-300 rounded-md px-2 py-1 text-[10px] focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 bg-white placeholder-teal-300'
                                        type="password"
                                        placeholder='Password'
                                        required
                                    />
                                </div>

                                <div className='space-y-0.5'>
                                    <label className='block text-[10px] font-medium text-teal-700'>Operational Years</label>
                                    <select
                                        onChange={e => setExperience(e.target.value)}
                                        value={experience}
                                        className='w-full border border-teal-300 rounded-md px-2 py-1 text-[10px] focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 bg-white text-teal-700'
                                    >
                                        <option value="1 Year">1 Year</option>
                                        <option value="2 Years">2 Years</option>
                                        <option value="3 Years">3 Years</option>
                                        <option value="4 Years">4 Years</option>
                                        <option value="5 Years">5 Years</option>
                                        <option value="6 Years">6 Years</option>
                                        <option value="8 Years">8 Years</option>
                                        <option value="9 Years">9 Years</option>
                                        <option value="10 Years">10 Years</option>
                                    </select>
                                </div>

                                <div className='space-y-0.5'>
                                    <label className='block text-[10px] font-medium text-teal-700'>Charging Fees</label>
                                    <input
                                        onChange={e => setFees(e.target.value)}
                                        value={fees}
                                        className='w-full border border-teal-300 rounded-md px-2 py-1 text-[10px] focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 bg-white placeholder-teal-300'
                                        type="number"
                                        placeholder='Fee/kWh'
                                        required
                                    />
                                </div>

                                <div className='space-y-0.5'>
                                    <label className='block text-[10px] font-medium text-teal-700'>Station Type</label>
                                    <select
                                        onChange={e => setSpeciality(e.target.value)}
                                        value={speciality}
                                        className='w-full border border-teal-300 rounded-md px-2 py-1 text-[10px] focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 bg-white text-teal-700'
                                    >
                                        <option value="Level 2 Charger">Level 2 Charger</option>
                                        <option value="DC Fast Charger">DC Fast Charger</option>
                                        <option value="Tesla Supercharger">Tesla Supercharger</option>
                                        <option value="Portable Charger">Portable Charger</option>
                                        <option value="Wireless Charger">Wireless Charger</option>
                                    </select>
                                </div>

                                <div className='space-y-0.5'>
                                    <label className='block text-[10px] font-medium text-teal-700'>Power Capacity</label>
                                    <input
                                        onChange={e => setDegree(e.target.value)}
                                        value={degree}
                                        className='w-full border border-teal-300 rounded-md px-2 py-1 text-[10px] focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 bg-white placeholder-teal-300'
                                        type="text"
                                        placeholder='e.g., 50 kW'
                                        required
                                    />
                                </div>

                                <div className='space-y-0.5'>
                                    <label className='block text-[10px] font-medium text-teal-700'>Station Address</label>
                                    <input
                                        onChange={e => setAddress1(e.target.value)}
                                        value={address1}
                                        className='w-full border border-teal-300 rounded-md px-2 py-1 text-[10px] focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 bg-white placeholder-teal-300'
                                        type="text"
                                        placeholder='Line 1'
                                        required
                                    />
                                    <input
                                        onChange={e => setAddress2(e.target.value)}
                                        value={address2}
                                        className='w-full border border-teal-300 rounded-md px-2 py-1 text-[10px] focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 bg-white placeholder-teal-300 mt-1'
                                        type="text"
                                        placeholder='Line 2'
                                        required
                                    />
                                </div>
                            </div>

                            {/* About Section */}
                            <div className='mt-3 space-y-0.5'>
                                <label className='block text-[10px] font-medium text-teal-700'>About Station</label>
                                <textarea
                                    onChange={e => setAbout(e.target.value)}
                                    value={about}
                                    className='w-full border border-teal-300 rounded-md px-2 py-1 text-[10px] focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 bg-white placeholder-teal-300 resize-none'
                                    rows={2}
                                    placeholder='Features, capacity...'
                                />
                            </div>

                            {/* Submit Button */}
                            <div className='mt-3 pt-2 border-t border-teal-200'>
                                <button
                                    type='submit'
                                    className='bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-md text-[10px] font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105'
                                >
                                    Add Station
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddStation