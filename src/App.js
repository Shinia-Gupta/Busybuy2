import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Navbar from './components/Navbar';
import PrivateRoute from "./components/PrivateRoute";
import Spinner from "./components/Spinner";

import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Order from './pages/Order';
import ResetPassword from './pages/ResetPassword';
import Cart from './pages/Cart';
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { authSelector } from './redux/reducers/authReducer';
import { productSelector } from './redux/reducers/productReducer';
import { cartSelector } from './redux/reducers/cartReducer';

function App() {
  // const {loading,setLoading}=useAuth();
  // useEffect(()=>{
  //   // setLoading(true);
  //   // setTimeout(()=>setLoading(false),4000);
  // },[loading]);

  const {loading}=useSelector(authSelector,productSelector);
    const router=createBrowserRouter([
      {
        path:"/",
        element:<Navbar/>,
  
        errorElement:<><Navbar/><ErrorPage/></>,
        children:[
          {path:"/",element:<Home/>},
          {path:'signup',element:<Register/>},
          {path:'signin',element:<Login/>},
          {path:'forgotpassword',element:<ResetPassword/>},
          {path:"users/:userId",
        children:[
          {path:"cart",element:<PrivateRoute><Cart/></PrivateRoute>},
          {path:"orders",element:<PrivateRoute><Order/></PrivateRoute>}
        ]}
        ]
      },
  
    
    ])
    // debugger;
    return (
  
  <>
  
  <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
          transition={Slide}
          />
  {loading?
  <Spinner/>:<RouterProvider router={router}/>
      }
  </>
    );
}

export default App;
