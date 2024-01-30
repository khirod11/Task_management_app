import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import app from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      console.log('User Signed Out Successfully!');
      alert('User Signed Out Successfully!');
      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      console.error('Error signing out', error);
      alert('Error signing out');
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link to={user ? '/home' : '/login'} className="navbar-brand text-white ms-5">
            Task_Management_App
          </Link>
          {user && (
            <div className="d-flex">
              <button
                className="btn btn-outline-dark text-white bg-success me-5"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
