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
import RequireAuth from '../pages/requireAuth/RequireAuth';
import Unauthorized from '../pages/unauthorized/Unauthorized';
import BarrelsPerCustomer from '../pages/clients/barrelsPerCustomer/BarrelsPerCustomer';
import AddStyle from '../pages/stylesBeer/addStyle/AddStyle';
import StylesBeer from '../pages/stylesBeer/styleBeer/StylesBeer';
import Prices from '../pages/stylesBeer/prices/Prices';
import StatusInformation from '../pages/barrels/statusBarrels/StatusInformation';
import Sales from '../pages/results/sales/Sales';
import Pay from '../pages/clients/payment/Pay';
import AddCost from '../pages/costs/addCost/AddCost';
import CostsDetails from '../pages/costs/costDetails/CostsDetails';
import AddSupplier from '../pages/others/suppliers/AddSupplier';
import IngredientsPrices from '../pages/products/ingredients/IngredientsPrices';
import ProductsCosts from '../pages/costs/productsCosts/ProductsCosts';
import Stock from '../pages/others/ingredients/Stock';
import Error404 from '../pages/404/Error404';
import Working from '../pages/workingPage/Working';
import ProductsStock from '../pages/productStock/ProductsStock';


const Router = () => {
  return (
    <BrowserRouter>
        <Layout>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/unauthorized" element={<Unauthorized/>}/>
                <Route path="/workingPage" element={<Working/>}/>
                
                <Route element={<RequireAuth allowedRoles={['delivery', 'admin']} />}>
                  <Route path="/barrels" element={<Barrels/>}/>
                </Route>

                <Route element={<RequireAuth allowedRoles={['admin']} />}>
                  <Route path="/main" element={<Main/>}/>
                  <Route path="/addclient" element={<AddClient/>}/>
                  <Route path="/clientInfo" element={<ClientsInfo/>}/>
                  <Route path="/barrelsPerCustomer" element={<BarrelsPerCustomer/>}/>
                  <Route path="/addStyle" element={<AddStyle/>}/>
                  <Route path="/styles" element={<StylesBeer/>}/>
                  <Route path="/prices" element={<Prices/>}/>
                  <Route path="/statusInformation" element={<StatusInformation/>}/>
                  <Route path="/sales" element={<Sales/>}/>
                  <Route path="/pay" element={<Pay/>}/>
                  <Route path="/addCost" element={<AddCost/>}/>
                  <Route path="/costDetails" element={<CostsDetails/>}/>
                  <Route path="/suppliers" element={<AddSupplier/>}/>
                  <Route path="/IngredientsPrices" element={<IngredientsPrices/>}/>
                  <Route path="/productsCosts" element={<ProductsCosts/>}/>
                  <Route path="/stock" element={<Stock/>}/>
                  <Route path="/productsStock" element={<ProductsStock/>}/>
                </Route>

                <Route path="*" element={<Error404/>} />
            </Routes>
        </Layout>
    </BrowserRouter>
  );
}

export default Router