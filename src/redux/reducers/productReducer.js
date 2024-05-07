import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


  const initialState={
    products:[],
    searchProduct:"",
    selectedFilters:[],
    filters : [
        "jewelery",
        "electronics",
        "men's clothing",
        "women's clothing",
      ],
    filteredItems:[],
    filteredItemsByCat:[],
    price:750,
loading:false,
error:null
  }

 export  const fetchProductsAsync=createAsyncThunk("products/getInitialProductState",async ()=>{
    return fetch("https://fakestoreapi.com/products").then(res=>res.json());
  })



  const productSlice=createSlice({
name:"products",
initialState:initialState,
reducers:{
searchProduct:(state,action)=>{
    if (state.products.length && action.payload.trim() !== "") {
        let prodBySearch = state.products.filter(
          (prod) =>
            prod.title
              .trim()
              .toLowerCase()
              .includes(action.payload.trim().toLowerCase()) ||
            prod.id.toString().includes(action.payload.trim())
        );
        state.filteredItems=[...prodBySearch];
      } else {
        state.filteredItems=[...state.products];
      }
},
filterProductByCat:(state,action)=>{
  // console.log(action.payload,"filter by cat");
    if (state.selectedFilters.includes(action.payload)) {
        let filters = state.selectedFilters.filter((f) => f !== action.payload);
        state.selectedFilters=[...filters];
      }
      //if the filter is new and does not already exist in selected filters array
      else {
        state.selectedFilters=[...state.selectedFilters, action.payload];
      }

      if (state.selectedFilters.length > 0) {
        let tempItems = state.selectedFilters.map((selectedCat) => {
          let temp = state.products.filter(
            (prod) => prod.category === selectedCat && prod.price <= state.price
          );
          return temp;
        });
        // console.log(
        //   // "filters in tempItems on already existing codn---",
        //   tempItems.flat()
        // );
        // console.log(
        //   "filters in filteredItems on already existing codn 1---",
        //   state.filteredItems
        // );
        // state.filteredItems=[...tempItems.flat()];
        // console.log(
        //   "filters in filteredItems on already existing codn 2---",
        //   state.filteredItems
        // );
        state.filteredItemsByCat=[...tempItems.flat()];
        // console.log(
        //   "filters in filteredItems on already existing codn 3---",
        //   state.filteredItemsByCat
        // );
      } else {
        state.filteredItems=[...state.products];
  
        // console.log(
        //   "filters in tempItems on new filter addition codn---",
        //   state.filteredItems
        // );
      }
      // state.price=
},
filterByPrice:(state,action)=>{
  state.price=action.payload;

    if (state.selectedFilters.length===0) {
        let prodFilterByPrice = state.products.filter((prod) => {
          return prod.price <= action.payload;
        });
        // setToShowProducts(prodFilterByPrice);
        state.filteredItems=[...prodFilterByPrice];
        state.price=action.payload;
      }else{
        let tempItems = state.selectedFilters.map((selectedCat) => {
          let temp = state.products.filter(
            (prod) => prod.category === selectedCat && prod.price <= state.price
          );
          return temp;
        });
        // let prodFilterByPrice = state.products.filter((prod) => {
        //   return prod.price <= action.payload;
        // });
        // setToShowProducts(prodFilterByPrice);
        state.filteredItemsByCat=[...tempItems.flat()];
        // state.products=[...prodFilterByPrice];
      }
}
},
extraReducers:(builder)=>{
builder
.addCase(fetchProductsAsync.pending,(state,action)=>{
    state.loading=true;
})
.addCase(fetchProductsAsync.fulfilled,(state,action)=>{
  // console.log(action.payload,"...products from api");
       state.products=[...action.payload];
       state.filteredItems=[...action.payload];
    state.loading=false;
})
.addCase(fetchProductsAsync.rejected,(state,action)=>{
    state.error=action.payload;
 state.loading=false;
})
}  
  })

  export const productReducer=productSlice.reducer;
export const actions=productSlice.actions;
export const productSelector=(state)=>state.productReducer;