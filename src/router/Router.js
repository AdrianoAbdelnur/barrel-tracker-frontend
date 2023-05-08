import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Main from '../pages/main/Main';
import AddClient from '../pages/clients/addNewClients/AddClient';
import ClientsInfo from '../pages/clients/information/ClientsInfo';
import Barrels from '../pages/barrels/Barrels';

const Router = () => {
  return (
    <BrowserRouter>
        <Layout>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/main" element={<Main/>}/>
                <Route path="/addclient" element={<AddClient/>}/>
                <Route path="/clientInfo" element={<ClientsInfo/>}/>
                <Route path="/barrels" element={<Barrels/>}/>
            </Routes>
        </Layout>
    </BrowserRouter>
  );
}

export default Router