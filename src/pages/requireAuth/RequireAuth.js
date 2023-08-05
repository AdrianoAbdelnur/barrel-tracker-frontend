import axios from './../../api/axios';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuth from './../../hooks/useAuth';
import './requireAuth.css'

const RequireAuth = ({allowedRoles}) => {
  const location = useLocation();
  const { setAuth } = useAuth();
  const [loggedStatus, setLoggedStatus] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAuthStatus();
  }, []);

  useEffect(() => {
    if (loggedStatus) {
      setAuth(loggedStatus);
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [loggedStatus]);

  const getAuthStatus = async () => {
    try {
      const { data } = await axios.get('/user/status');
      if (!data?.isLogged) setLoggedStatus({ isLogged: false });
      else setLoggedStatus({ isLogged: true, role: data.role });
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className='requireAuth_container'>
      {
          !isLoading
        ? allowedRoles.find(role => role === loggedStatus?.role) 
        ? <Outlet />
        : loggedStatus?.isLogged
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
        : <p>loading</p>
    }
    </div>
  );
};

export default RequireAuth;