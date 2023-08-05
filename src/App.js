import { useEffect } from 'react';
import './App.css';
import useAuth from './hooks/useAuth';
import Router from './router/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from './api/axios';

function App() {
  const {setAuth} = useAuth();

  useEffect(() => {
    getAuthStatus()
    // eslint-disable-next-line
  }, [])
  
  const getAuthStatus = async () => {
    try {
      const { data } = await axios.get('/user/status');
      if (!data?.isLogged) setAuth({ isLogged: false });
      else setAuth({ isLogged: true, role: data.role });
    } catch (error) {
      localStorage.clear('token')
    }
  };
  return (
      <Router/>
  );
}

export default App;
