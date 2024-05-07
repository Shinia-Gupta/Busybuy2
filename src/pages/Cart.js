import React, { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseInit';
// import { useAuth } from '../Context/AuthContext';
// import { useProducts } from '../Context/ProductsContext';
import { useParams } from 'react-router-dom';
import CartCard from '../components/CartCard';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { actions, authSelector, fetchUserRefAsync } from '../redux/reducers/authReducer';
import { cartSelector, fetchCartAsync, purchaseCartItemsAsync,cartactions } from '../redux/reducers/cartReducer';

function Cart() {
    // const [userCart, setUserCart] = useState([]);
    const { currentUser,  currentUserData  } = useSelector(authSelector);
    console.log(currentUserData);
    // const { currentCartUserRef,usercartAmount,userData,handleCartOperations,fetchUserRef,fetchUserCart,userCart,setUserCart} = useProducts();
    // const { userId } = useParams();
    // const [cartAmount, setCartAmount] = useState(0);
let {cartAmount}=useSelector(cartSelector);
// let newCart=[...cart];
// const {setLoading,loading}=useAuth();
const dispatch=useDispatch();

useEffect(()=>{
   
  console.log(currentUserData,"currentUserData in cart useeffect");
  // dispatch(cartactions.fetchCart(currentUserData.cart));
  if(!currentUserData){
    dispatch(fetchUserRefAsync());
  }
  dispatch(fetchCartAsync(currentUser))
},[])

useEffect(()=>{
dispatch(fetchCartAsync(currentUser))
},[currentUserData])


useEffect(() => {
    if (currentUserData.cart.length) {
      let newCart=[...currentUserData.cart];
      let amount = newCart.reduce(
        (acc, prod) => acc + prod.quantity * prod.price,
        0
      );
      cartAmount=amount.toFixed(2);
    }else{
        cartAmount=0;
    }
   
  }, [currentUserData.cart]);

    const handlePurchase = async () => {
      // setLoading(true);
      if(currentUserData.cart.length===0){
        toast.info("No products in your cart!");
        return;
      }
        // let purchaseData = [
        //   ...userData.orders,
        //   { userCart, cartAmount: parseFloat(cartAmount), timestamp: Date.now() },
        // ];
        // const currentUserRef = doc(db, "users", currentCartUserRef);
        // await updateDoc(currentUserRef, {
        //   orders: purchaseData,
        // });
        // setUserCart([]);
        // // After adding the products to orders, set the cart as empty
        // await updateDoc(currentUserRef, { cart: [] });
        // // setLoading(false);
        let order=[...currentUserData.cart,cartAmount];
        dispatch(purchaseCartItemsAsync({order,currentUser}));
        console.log("purchased");
        toast.success("Order placed successfully");
      };




  const handleDecreaseQuantity = async (prod) => {
    // Increment the quantity of the product in the cart array
   
//         if(prod.quantity===1){
//             handleCartOperations("REMOVE_CART_ITEM",prod);
          
//         }else{
//             const updatedCart = userCart.map((product) => {
//         if (product.id === prod.id) {
//         //check if prod recieved has quantity 1, then remove the product from cart and return
      
//         return { ...product, quantity: product.quantity - 1 }; 
//       }
//          return product;
//         });

//     // Update the cart data in Firestore
//     const currentUserRef = doc(db, "users", currentCartUserRef);
//     await updateDoc(currentUserRef, { cart: updatedCart });
// // await updateDoc(currentCartUserRef,{cartAmount:increment(prod.price)})
//     setUserCart(updatedCart);
console.log('quantity decreased');
    toast.success(`Cart updated for product id- ${prod.id}`);
  }


    return (
        <>
            <h1 className='font-bold text-3xl p-10 text-orange-500'>Your Cart</h1><hr />
            <div className='flex gap-5 justify-between items-center v-screen'>
                {/* Sidebar */}
                <div className='bg-orange-50 w-1/5 ml-10 flex flex-col justify-center items-center gap-2 p-5 rounded-xl'>
                    <h1 className='font-bold text-3xl'>Total Amount</h1>
                    <p>$ {cartAmount}</p>
                    <button onClick={() =>handlePurchase() } className='mt-4 py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition duration-300 ease-in-out'>Purchase</button>
                </div>
                {/* Products */}
                <div className='w-full mr-10 flex flex-wrap gap-4 mt-16'>
                    {currentUserData?.cart?.length === 0 ? (
                        <h1 className='font-bold text-2xl text-red-600'>Cart is empty! Shop Now</h1>
                    ) : (
                        currentUserData?.cart?.map((cartProd) => (
                             <CartCard key={cartProd.id} product={cartProd}  handleDecreaseQuantity={handleDecreaseQuantity}/>
                            
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Cart;
