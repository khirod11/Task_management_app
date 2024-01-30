import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const handleResetPassword = async () => {
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
      setError(null);
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
      setResetEmailSent(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-5 " style={{"height" : "80vh"}}>
      <div className = "bg-primary-subtle p-5 border border-primary">
      <h2 className='d-flex justify-content-center border border-primary mb-2 bg-success-subtle'>Password Reset</h2>
      <div>
        <label htmlFor="email" className="form-label m-3">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleResetPassword} className="btn btn-primary ms-3">Send Password Reset Email</button>
      {resetEmailSent && <p className='d-flex justify-content-center mt-2'>Password reset email sent.<br/> Check your email inbox.</p>}
      {error && <p>Error: {error}</p>}
      <div className='d-flex ms-4'>
      <button className='bg-success-subtle ms-3 mt-2'>
      <Link to="/login" className='text-decoration-none'>Go back to Login Page</Link>
      </button>
      </div>
      </div>
    </div>
  );
};

export default PasswordReset;
