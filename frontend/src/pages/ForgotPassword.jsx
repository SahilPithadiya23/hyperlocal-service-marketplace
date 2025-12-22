import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // await axios.post('http://localhost:3000/api/auth/forgot-password', { email });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          'Something went wrong. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center min-h-screen justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-xl text-center">
          <h1 className="text-3xl font-bold mb-4">Check your email</h1>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-blue-600 hover:underline"
            >
              try again
            </button>
          </p>
          <Link
            to="/user-login"
            className="inline-block bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-950 transition"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-xl">
        <h1 className="text-3xl font-bold w-full text-center mb-2">
          Forgot Password
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your email and we'll send you a reset link
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-semibold mb-1">Email Address</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="border p-2 rounded w-full mb-6"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="hover:cursor-pointer bg-gray-800 text-white p-2 rounded w-full hover:bg-gray-950 transition disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Reset Password'}
          </button>

          <p className="text-center mt-4">
            <Link to="/user-login" className="text-blue-600 hover:underline">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
