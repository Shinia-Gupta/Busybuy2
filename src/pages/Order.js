import React, { useEffect, useState } from 'react';
// import { useProducts } from '../Context/ProductsContext';
// import { doc, onSnapshot } from 'firebase/firestore';
// import { db } from '../config/firebaseInit';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authReducer';
import { cartSelector, fetchOrdersAsync } from '../redux/reducers/cartReducer';
// import { useAuth } from '../Context/AuthContext';

function Order() {
    const { currentUser } = useSelector(authSelector);
const {orders}=useSelector(cartSelector);
    // const [orders, setUserOrders] = useState([]);
// const [totalAmount,setTotalAmount]=useState(0);
const dispatch=useDispatch();
// const {setLoading}=useAuth();
    // const fetchOrders = async () => {
    //     if (currentUser) {
    //         // const docRef = doc(db, "users", currentCartUserRef);
    //         // await onSnapshot(docRef, (doc) => {
    //         //     const userData = doc.data();
    //         //     // console.log(userData.orders,"orders data");
    //         //     setUserOrders(userData.orders || []);
    //         // });
    //         dispatch(fetchOrdersAsync(currentUser));
    //     }
    // };

    // useEffect(() => {
    //     if (!currentUser) {
    //         fetchUserRef();
    //     }
    // }, [currentCartUserRef, fetchUserRef]);

    useEffect(() => {
        dispatch(fetchOrdersAsync(currentUser));
    }, [currentUser]);

    return (
        <div className='bg-gray-100 min-h-screen'>
            <h1 className='font-bold text-3xl p-10 text-orange-500'>Your Orders</h1>
            <hr className='border-gray-300' />
            {/* <div className='w-full mr-10 flex flex-wrap gap-4 mt-16'> */}
                    {orders.length === 0 ? (
                        <h1 className='font-bold text-2xl text-red-600 text-center'>No orders yet! </h1>
                    ) : (
                        
                    // </div>
            <div className='flex justify-center mt-10'>
                <div className='bg-white shadow-lg rounded-lg overflow-hidden w-2/3'>
                    {orders.map((order, index) => (
                        <div key={index} className='bg-orange-100 p-4'>
                            <p className='text-lg font-semibold'>Order Created on: <span className='font-bold'>{new Date(order.timestamp).toLocaleDateString()}</span></p>
                            <table className='w-full border-collapse'>
                                <thead className='bg-gray-300'>
                                    <tr>
                                        <th className='py-2 px-4 text-left' colSpan={4}>Product</th>
                                        <th className='py-2 px-4 text-left'>Title</th>
                                        <th className='py-2 px-4 text-left'>Price</th>
                                        <th className='py-2 px-4 text-left'>Quantity</th>
                                        <th className='py-2 px-4 text-left'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.userCart.map((prod, index) => (
                                        <tr key={index}>
                                            <td colSpan={4} className='py-2 px-4'>{<img className="size-16 rounded border border-orange-500" src={prod.image}/>}</td>
                                            <td className='py-2 px-4'>{prod.title}</td>
                                            <td className='py-2 px-4'>$ {prod.price}</td>
                                            <td className='py-2 px-4'>{prod.quantity}</td>
                                            
                                        </tr>
                                    ))}
                                    <tr >
                                    <td></td> <td></td> <td></td>  <td></td>
                                        <td colSpan='3' className='py-2 px-4 text-right font-bold'>Total amount</td>
                                       
                                        <td className='py-2 px-4 font-bold'>$ {order.cartAmount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>)}
        </div>
    );
}

export default Order;
