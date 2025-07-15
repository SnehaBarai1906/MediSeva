import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message || 'Login failed');
          return;
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-md mx-auto mt-20 bg-white border border-gray-200 shadow-xl rounded-2xl p-10"
    >
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {state} <span className="text-purple-600">Login</span>
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            placeholder="admin@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-2.5 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Login
        </button>

        <div className="text-center mt-6 text-sm text-gray-600">
          {state === 'Admin' ? (
            <>
              Doctor Login?{' '}
              <span
                onClick={() => setState('Doctor')}
                className="text-purple-600 hover:underline cursor-pointer font-medium"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Admin Login?{' '}
              <span
                onClick={() => setState('Admin')}
                className="text-purple-600 hover:underline cursor-pointer font-medium"
              >
                Click here
              </span>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
