import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  setDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebaseInit";

const initialState = {
  loading: false,
  error: null,
  cart: [],
  cartAmount: 0,
  orders: [],
};

// export const addToCartAsync=createAsyncThunk("cart/addToCart",async({cart,currentUser})=>{
//     console.log(currentUser.uid, cart,"...in cart reducer add to cart func");
// return await setDoc(doc(db, "cart", currentUser.uid), cart);
// })
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({ prod, currentUser }) => {
    try {
      // Fetch the current cart from Firestore
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      console.log(docSnap, "docsnap ");
      const userRef = docSnap.exists() ? docSnap.data() : [];
      //   console.log(userRef,"current user ");
      // Merge the new product with the current cart
      let newProd = { ...prod, quantity: 1 };
      const updatedCart = [...userRef.cart, newProd];

      // Set the updated cart back to Firestore
      await updateDoc(docRef, { cart: updatedCart });
      return updatedCart;
      //   return updatedCart;
    } catch (error) {
      // Handle any errors
      console.error("Error adding to cart:", error);
      throw error;
    }
  }
);

export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async ({ prod, currentUser }) => {

    try {
        // Fetch the current cart from Firestore
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap, "docsnap ");
        const userRef = docSnap.data();
        
        //   console.log(userRef,"current user ");
        // Merge the new product with the current cart
        // let newProd = { ...prod, quantity: 1 };
        const updatedCart = userRef.cart.filter((cartProd)=>cartProd.id!==prod.id);
  
        // Set the updated cart back to Firestore
        await updateDoc(docRef, { cart: updatedCart });
        return updatedCart;
        //   return updatedCart;
      } catch (error) {
        // Handle any errors
        console.error("Error adding to cart:", error);
        throw error;
      }
    // console.log(currentUser, "...in cart reducer remove from cart func");
    // return await setDoc(doc(db, "cart", currentUser.uid), cart);
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async ({ prod,quantity, currentUser }) => {
    console.log(currentUser, "...in cart reducer update cart func");
    const docRef=doc(db, "users", currentUser.uid);
const docSnap=await getDoc(docRef);
const userRef=docSnap.data();
// const prodToUpdate=userRef.cart.filter((cartProd)=>cartProd.id===prod.id);
// prodToUpdate.quantity+=quantity;
const updatedCart=userRef.cart.map((cartProd)=>{if(cartProd.id===prod.id){
    return {...cartProd,quantity:cartProd.quantity+quantity}
}});
    return await updateDoc(userRef, {cart:updatedCart});
  }
);

export const fetchCartAsync = createAsyncThunk(
  "cart/getCart",
  async ({ currentUser }) => {
    // console.log(currentUser, "...in cart reducer fetch cart func");
    // const cart = await getDoc(doc(db, "users", currentUser.uid));
    // console.log(cart, "user cart- user itsef");
    const docRef = doc(db, "users", currentUser.uid);
    // console.log(docRef, "docRef ");
  
    const docSnap = await getDoc(docRef);
    console.log(docSnap, "docsnap ");
    const userRef = docSnap.exists() ? docSnap.data() : [];
    console.log(userRef,"...user ref data");
    return userRef.cart;
  }
);

export const purchaseCartItemsAsync = createAsyncThunk(
  "cart/purchaseItems",
  async ({ order, currentUser }) => {
    console.log(currentUser, "...in cart reducer purchase cart func");
    // await setDoc(doc(db, "orders", currentUser.uid), [
    //   ...initialState.orders,
    //   currentUser.uid,
    //   ...cart,
    // ]);
    const docRef=doc(db, "users", currentUser.uid);
const docSnap=await getDoc(docRef);
const userRef = docSnap.exists() ? docSnap.data() : [];
const updatedOrder=[...userRef.orders,order]
await updateDoc(docRef, { orders: updatedOrder,cart:[] });
      return updatedOrder;
    // return await setDoc(doc(db, "cart", currentUser.uid), []);
  }
);
export const fetchOrdersAsync = createAsyncThunk(
  "cart/fetchOrders",
  async ({ currentUser }) => {
    console.log(currentUser, "...in cart reducer fetch order func");
    return await getDocs(doc(db, "orders", currentUser.uid));
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    fetchCart:(state,action)=>{
      state.cart=[...action.payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        console.log(action.payload, "...add to cart fulfilled");
        state.cart = [action.payload];
        state.loading = false;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCartAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        console.log(action.payload,"...remove from cart");
        state.cart = [action.payload];
        state.loading = false;
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCartAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.cart = [action.payload];
        state.loading = false;
      })
      .addCase(updateCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCartAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.cart = [action.payload];
        state.loading = false;
      })
      .addCase(fetchCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(purchaseCartItemsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(purchaseCartItemsAsync.fulfilled, (state, action) => {
        state.orders = [...state.orders, ...action.payload];
        state.loading = false;
      })
      .addCase(purchaseCartItemsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrdersAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.orders = [...action.payload];
        state.cart=[];
        state.loading = false;
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const cartReducer = cartSlice.reducer;
export const cartactions = cartSlice.actions;
export const cartSelector = (state) => state.cartReducer;
