import { createContext, useState } from "react";
import { toast } from 'react-toastify';
import apiClient from '../services/apiClient';


export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    // backendUrl is now handled by apiClient

    const [dToken, setDToken] = useState(false); // No longer use localStorage
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    // Getting Doctor appointment data from Database using API
    const getAppointments = async () => {
        try {
            const { data } = await apiClient.get('/api/doctor/appointments');
            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Getting Doctor profile data from Database using API
    const getProfileData = async () => {
        try {
            const { data } = await apiClient.get('/api/doctor/profile');
            console.log(data.profileData)
            setProfileData(data.profileData)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel doctor appointment using API
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await apiClient.post('/api/doctor/cancel-appointment', { appointmentId });
            if (data.success) {
                toast.success(data.message)
                getAppointments()
                // after creating dashboard
                getDashData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    // Function to Mark appointment completed using API
    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await apiClient.post('/api/doctor/complete-appointment', { appointmentId });
            if (data.success) {
                toast.success(data.message)
                getAppointments()
                // Later after creating getDashData Function
                getDashData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    // Getting Doctor dashboard data using API
    const getDashData = async () => {
        try {
            const { data } = await apiClient.get('/api/doctor/dashboard');
            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        dToken, setDToken,
        appointments,
        getAppointments,
        cancelAppointment,
        completeAppointment,
        dashData, getDashData,
        profileData, setProfileData,
        getProfileData,
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )


}

export default DoctorContextProvider


