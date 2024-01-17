import {  createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/cartReducer'

const CartContext=createContext();

//getting the localstorage data that is setted 
const getLocalCartData=()=>{
    let localCartData=localStorage.getItem("myCartStorage");
    // if(localCartData===[]){
    //     return [];
    // }
    // else{
    //     return JSON.parse(localCartData);
    // }
    const parsedData=JSON.parse(localCartData);
    //checking for array
    if(!Array.isArray(parsedData)) return[];
    return parsedData;         
}

const initialState={
    //to store all the cart details
    cart:getLocalCartData(),
    total_item:"",
    total_price:"",
    shipping_fee:50000,

}

const CartProvider=({children})=>{
    const[state,dispatch]=useReducer(reducer,initialState);

    const addToCart=(id,color,amount,product)=>{
        dispatch({type:"ADD_TO_CART",payload:{id,color,amount,product}});
    }

    const removeItem=(id)=>{
        dispatch({type:"REMOVE_ITEM",payload:id})
    }

    //to clear the cart
    const clearCart=()=>{
        dispatch({type:"CLEAR_CART"})
    }

    //to increment or decrement the product from the 
    // the cart

    const setDecrement = (id) => {
         dispatch({type:"SET_DECREMENT",payload:id});
      };
    
      const setIncrement = (id) => {
          dispatch({ type: "SET_INCREMENT", payload: id });
      };

    //to set  localStorage

    useEffect(()=>{

        // dispatch({type:"CART_TOTAL_ITEM"})
        // dispatch({type:"CART_TOTAL_PRICE"})
        //myStorage is just the name of the localStorage
        //cart is a array so need to be converted into string
        //state.cart is dependency array  

        dispatch({type:"CART_ITEM_PRICE_TOTAL"})
        localStorage.setItem("myCartStorage",JSON.stringify(state.cart))
    },[state.cart])

    return <CartContext.Provider value={{...state,addToCart,removeItem,clearCart,setDecrement,setIncrement}}>
        {children}
    </CartContext.Provider>;
}

const useCartContext=()=>{
    return useContext(CartContext);
}
export {CartProvider,useCartContext};