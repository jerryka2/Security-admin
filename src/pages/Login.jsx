import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/StationContext';
import apiClient from '../services/apiClient';

const Login = () => {
  const [state, setState] = useState('Admin'); // Toggle between Admin and Station Manager
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
          toast.success('Station Admin login successful');
        } else {
          setDToken(true); // Just set a flag or fetch station manager info if needed
          toast.success('Station Manager login successful');
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
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-green-100/30 to-white">
      <div className="relative flex flex-col gap-8 m-auto items-center p-8 sm:p-12 min-w-[360px] sm:min-w-[460px] bg-white rounded-3xl shadow-2xl border border-green-100/50 animate-slide-in-up">
        {/* Decorative Elements */}
        <div className="absolute -top-6 -left-6 w-14 h-14 bg-gradient-to-br from-green-700 to-green-800 rounded-full opacity-70 animate-pulse delay-200"></div>
        <div className="absolute -bottom-6 -right-6 w-14 h-14 bg-gradient-to-br from-green-800 to-green-700 rounded-full opacity-70 animate-pulse delay-400"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 rounded-3xl"></div>

        <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-700 relative z-10">
          {state} Login
        </p>

        <div className="w-full relative z-10">
          <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full p-4 border border-green-100 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-700 outline-none bg-green-50/30 shadow-sm hover:shadow-md transition-all duration-300"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="w-full relative z-10">
          <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full p-4 border border-green-100 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-700 outline-none bg-green-50/30 shadow-sm hover:shadow-md transition-all duration-300"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-white w-full py-4 rounded-full font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative z-10"
        >
          Login
        </button>

        <p className="text-sm text-gray-600 relative z-10">
          {state === 'Admin' ? (
            <>
              Station Manager Login?{' '}
              <span
                onClick={() => setState('Station Manager')}
                className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-800 underline cursor-pointer hover:font-semibold transition-all duration-200"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Station Admin Login?{' '}
              <span
                onClick={() => setState('Admin')}
                className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-800 underline cursor-pointer hover:font-semibold transition-all duration-200"
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