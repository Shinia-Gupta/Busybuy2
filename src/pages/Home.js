import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
// import { useProducts } from '../Context/ProductsContext';
import { useDispatch, useSelector } from 'react-redux';
import { actions, fetchProductsAsync, productSelector } from '../redux/reducers/productReducer';
import { cartactions, fetchCartAsync } from '../redux/reducers/cartReducer';
import { authSelector } from '../redux/reducers/authReducer';

function Home() {
    // const [price, setPrice] = useState(75000);
    const [searchProd,setSearch]=useState("");
    const { products,price,filters,selectedFilters,filteredItems,filteredItemsByCat} = useSelector(productSelector); 
    const {currentUserData}=useSelector(authSelector);
    const dispatch=useDispatch();
    // const handleProdByPrice=()=>{
    // fetchProductByPrice();
    // //    setProducts(prodByPrice);
    // }
    useEffect(()=>{
        dispatch(actions.filterByPrice(price))  
      },[price]);
useEffect(()=>{
    dispatch(fetchProductsAsync());
},[])
    return (
        
        <div className="container mx-auto px-4 pt-20">
            <div className='flex justify-center items-center mb-5'>
                <input type='text' placeholder='Search by Name or Product Id' onChange={(e)=>{
                    setSearch(e.target.value);
                    dispatch(actions.searchProduct(searchProd))
                    }} value={searchProd} className='w-2/5 h-full p-5 rounded-xl max-xl border mt-2 border-orange-400' />
            </div>
            <div className='flex gap-5 justify-between items-start'>
                {/* Sidebar filters */}
                <div className='bg-orange-50 w-1/5 flex flex-col justify-center items-center gap-2 p-5 rounded-xl'>
                    <h1 className='font-bold text-3xl'>Filters</h1>
                    <p className='font-bold text-xl'>Price: $ {price}</p>
                    <input type='range' value={price} onChange={(e) => dispatch(actions.filterByPrice(e.target.value))} min={0} max={750} />
                    <p className='font-bold text-xl'>Category</p>
                    <div className='flex flex-col justify-start items-start'>
                        {/* <div>
                            <label htmlFor="menClothing">Men's Clothing  </label>
                            <input id="menClothing" type='checkbox' value={"Men's clothing"} onClick={handleCat1}/>
                        </div>
                        <div>
                            <label htmlFor="womenClothing">Women's Clothing </label>
                            <input id="womenClothing" type='checkbox' value={"Women's clothing"} onChange={handleCat2} />
                        </div>
                        <div>
                            <label htmlFor="jewellery">Jewellery  </label>
                            <input id="jewellery" type='checkbox' value={"Jewellery"} onClick={handleCat3}/>
                        </div>
                        <div>
                            <label htmlFor="electronics">Electronics  </label>
                            <input id="electronics" type='checkbox' value={"Electronics"} onClick={handleCat4}/>
                        </div> */}
                        {filters.map((category,index)=>(
                            <button onClick={()=>dispatch(actions.filterProductByCat(category,price))} className={`${selectedFilters?.includes(category)?"bg-orange-300":"bg-slate-300"} rounded p-2 m-2 font-bold text-orange-500 capitalize `} key={index}>{category}</button>
                        ))}
                    </div>
                </div>
                {/* Products */}
                {/* <div className='w-4/5 flex flex-wrap gap-4'>
                    {toShowproducts.map((prod) => (
                        <ProductCard key={prod.id} product={prod}/>
                    ))}
                </div> */}
                <div className='w-4/5 flex flex-wrap gap-4'>
                    {selectedFilters.length===0 && filteredItems.map((prod,index) => (
                        <ProductCard key={prod.id} product={prod}/>
                    ))}

{selectedFilters.length>0 && filteredItemsByCat.map((prod,index) => (
                        <ProductCard key={prod.id} product={prod}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
