import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name,
          password,
          email,
        });
        if (data.success) {
          setToken(data.token);
          localStorage.setItem('token', data.token);
          // toast.success("Account created successfully");
          // navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          localStorage.setItem('token', data.token);
          // toast.success("Login successful");
          // navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  },[token])

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center bg-white px-4"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-5">
        <p className="text-2xl font-bold text-center text-gray-800">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p className="text-sm text-center text-gray-600">
          Please {state === 'Sign Up' ? 'sign up' : 'login'} to book appointment
        </p>

        {state === 'Sign Up' && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Full name</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p className="text-center text-sm text-gray-700">
            Already have an account?{' '}
            <span
              className="text-indigo-600 cursor-pointer hover:underline"
              onClick={() => setState('Login')}
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="text-center text-sm text-gray-700">
            Create a new account?{' '}
            <span
              className="text-indigo-600 cursor-pointer hover:underline"
              onClick={() => setState('Sign Up')}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
