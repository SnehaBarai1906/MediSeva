import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (state === 'Sign Up') {
        alert('Account created (mock)');
      } else {
        alert('Login successful (mock)');
      }
      navigate('/');
    } catch (err) {
      setError('Something went wrong!');
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-5">
        <p className="text-2xl font-bold text-center text-gray-800">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p className="text-sm text-center text-gray-600">
          Please {state === 'Sign Up' ? 'sign up' : 'login'} to book appointment
        </p>

        {error && (
          <p className="text-sm text-center text-red-600 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}

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
          className={`w-full text-white py-2 rounded-lg transition ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
          disabled={loading}
        >
          {loading ? 'Please wait...' : state === 'Sign Up' ? 'Create Account' : 'Login'}
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
