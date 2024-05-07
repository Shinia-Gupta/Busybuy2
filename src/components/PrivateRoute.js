import React from 'react'
// import { useAuth } from '../Context/AuthContext';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authReducer';

function PrivateRoute({children}) {
    const {currentUser,loading}=useSelector(authSelector);
    
    if(loading){
        return (
            <span>Loading...Please Wait</span>
        )
    }
        if(currentUser){
            return children;
        }
    
}

export default PrivateRoute
