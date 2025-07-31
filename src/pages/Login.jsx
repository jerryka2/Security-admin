import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/EventContext';
import apiClient from '../services/apiClient';

const Login = () => {
  const [state, setState] = useState('Admin'); // Toggle between Admin and Event Organizer
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // backendUrl is now handled by apiClient

  const { setDToken } = useContext(DoctorContext);
  const { setAToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const endpoint = state === 'Admin' ? '/api/admin/login' : '/api/doctor/login';
      const { data } = await apiClient.post(endpoint, { email, password });

      if (data.success) {
        if (state === 'Admin') {
          setAToken(true); // Just set a flag or fetch admin info if needed
          toast.success('Admin login successful');
        } else {
          setDToken(true); // Just set a flag or fetch event organizer info if needed
          toast.success('Event Organizer login successful');
        }
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Login error');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-orange-50/30 to-white">
      <div className="relative flex flex-col gap-6 m-auto items-center p-8 sm:p-10 min-w-[340px] sm:min-w-[420px] bg-white rounded-3xl shadow-2xl border border-orange-100/50 animate-slide-in-up">
        {/* Decorative Elements */}
        <div className="absolute -top-5 -left-5 w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full opacity-75 animate-pulse delay-200"></div>
        <div className="absolute -bottom-5 -right-5 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-75 animate-pulse delay-400"></div>

        <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
          {state} Login
        </p>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full p-3.5 border border-orange-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none bg-orange-50/30 shadow-sm hover:shadow-md transition-all duration-300"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full p-3.5 border border-orange-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none bg-orange-50/30 shadow-sm hover:shadow-md transition-all duration-300"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white w-full py-3.5 rounded-full font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          Login
        </button>

        <p className="text-sm text-gray-600">
          {state === 'Admin' ? (
            <>
              Event Organizer Login?{' '}
              <span
                onClick={() => setState('Event Organizer')}
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 underline cursor-pointer hover:font-semibold transition-all duration-200"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Admin Login?{' '}
              <span
                onClick={() => setState('Admin')}
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 underline cursor-pointer hover:font-semibold transition-all duration-200"
              >
                Click here
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;