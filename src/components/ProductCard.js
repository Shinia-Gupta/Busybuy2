import React, { useState } from "react";
// import { useProducts } from '../Context/ProductsContext';
// import { useAuth } from '../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { increment, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import {
  addToCartAsync,
  cartSelector,
  cartactions,
  updateCartAsync,
} from "../redux/reducers/cartReducer";

function ProductCard({ product }) {
  // const { handleCartOperations, setUserCartAmount,handleIncreaseQuantity } = useProducts();
  const { currentUser,currentUserData } = useSelector(authSelector);
  const { cart } = useSelector(cartSelector);
  // const [cartAmount,setCartAmount]=useState(0);
  // const [userCart,setUserCart]=useState([]);
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Add To Cart");
  const dispatch = useDispatch();

  const productExistsInCart = (prod) => {
    console.log(currentUserData,"prod exists in cart user");
    return currentUserData?.cart?.find((product) => product.id === prod.id);
  };

  const handleCart = async (prod) => {
    // debugger;
    // let newCart=[...cart];
    if (!currentUser) {
      navigate("/signin");
      toast.error("Please sign in to continue");
      return;
    }
    if (productExistsInCart(prod)) {
      // handleIncreaseQuantity(prod);
      // prod.quantity++;
    //   const cartPos = cart
    //     .map(function (product) {
    //       return product.id;
    //     })
    //     .indexOf(prod.id);
    //   let newCart = [...cart];
    //   if (cartPos !== -1) {
    //     newCart[cartPos].quantity += 1;
    //   }
    // dispatch(cartactions.fetchCart(currentUserData.cart))

      dispatch(updateCartAsync({prod,quantity:1, currentUser}));

      toast.info("product quantity updated");
      return;
    }
    // setCartAmount((prevState) => prevState + Number(product.price));
    setButtonText("Adding"); // Change button text to 'Adding'
    setTimeout(() => {
      setButtonText("Add To Cart"); // Change button text back to 'Add To Cart' after 1-2 seconds
    }, 1000); // Adjust the timeout duration as needed
    // let newProd={...prod,quantity:1};
    // dispatch(addToCartAsync([...cart,newProd],currentUser))
    // let newCart=[...cart, newProd];
    // console.log(newCart,"...new cart");
    // console.log(newProd,"......prod");
    dispatch(addToCartAsync({ prod, currentUser }));
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg flex flex-col h-auto w-48">
      <div className="h-40 overflow-hidden">
        <img
          src={product.image}
          alt="product image"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4">
        <p className="text-lg font-semibold mb-2 text-gray-900 truncate">
          {product.title}
        </p>
        <p className="text-gray-700 font-medium">Price: ${product.price}</p>
        <button
          onClick={() => handleCart(product)}
          className="mt-4 py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition duration-300 ease-in-out focus:outline-none"
          disabled={buttonText === "Adding"} // Disable button when 'Adding' text is displayed
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
