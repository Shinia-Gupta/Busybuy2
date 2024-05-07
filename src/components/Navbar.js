import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
// import { useAuth } from '../Context/AuthContext';
import {  toast } from 'react-toastify';
// import { useProducts } from '../Context/ProductsContext';
import { useDispatch, useSelector } from 'react-redux';
import { actions, authSelector } from '../redux/reducers/authReducer';

function Navbar() {
    const { currentUser } = useSelector(authSelector);
    // const [loading,setLoading]=useState(false);
    const {logout}=actions;
// const {currentCartUserRef}=useProducts();
const dispatch=useDispatch();

    const handleLogout=async()=>{
try {
    // setLoading(true);
     dispatch(logout());
toast.success("User successfully logged out");
} catch (error) {
    console.log(error);
    toast.error("Something went wrong! User could not be logged out")
}
// setLoading(false);
    }
    return (
        <>
               

        <div className='flex justify-between bg-orange-200 h-16 items-center sticky'>
            <div><h1 className='text-3xl font-bold text-orange-600'>BUSYBUY</h1></div>
            <div className='flex gap-3 mr-4'>
            <NavLink to="/" className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "text-gray-500 font-bold"}>Home</NavLink>
                {!currentUser ? (
                    <>
                        <NavLink to="/signup" className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "text-gray-500 font-bold"}>Signup(New User)</NavLink>
                        <NavLink to="/signin" className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "text-gray-500 font-bold"}>Signin(Existing User)</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to={`/users/${currentUser.uid}/cart`} className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "text-gray-500 font-bold"}>Cart</NavLink>
                        <NavLink to={`/users/${currentUser.uid}/orders`} className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "text-gray-500 font-bold"}>Orders</NavLink>
                        <NavLink to="/" onClick={handleLogout} className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "text-gray-500 font-bold"}>Logout</NavLink>
                    </>
                )}
            </div>
        </div>
        <Outlet/>
        </>
    );
}

export default Navbar;
