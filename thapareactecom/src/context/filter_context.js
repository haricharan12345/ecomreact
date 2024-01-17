import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./productcontext";

//we can use any name => here we used reducer
import reducer from '../reducer/filterReducer'

const FilterContext=createContext();

// children is app component
const initialState={
    filter_products:[],
    all_products:[],
    grid_view:false,
    sorting_value:"lowest",
    filters:{
        //whatever value entered by the user
        text:"",
        category:"all",
        company:"all",
        color:"all",
        maxPrice: 0,
        price: 0,
        minPrice: 0,
    }

}


export const FilterContextProvider=({children})=>{

    //getting products from the  useProductContext hook
    const { products }=useProductContext();
    // console.log(products);
    const [state,dispatch]=useReducer(reducer,initialState);
    //adding inside the dependency array
    //here we are passing the products that whenever 
    //it triggers it loads the products data from the usecontext

    // to set the grid view
    const setGridView=()=>{
       return dispatch({type:"SET_GRID_VIEW"})
    }

    const setListView=()=>{
        return dispatch({type:"SET_LIST_VIEW"})
     }

     //sorting function
     const sorting=(event)=>{
        let userValue=event.target.value;
        dispatch({type:"GET_SORT_VALUE",payload:userValue});
    }

      // update the filter values
  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };

  // to clear the filter
  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };


    // to sort the products based on diffrent options
    useEffect(()=>{
        dispatch({type:"FILTER_PRODUCT"});
        dispatch({type:"SORTING_PRODUCTS"});

    },[state.sorting_value,state.filters])

    // here products is adde in dependency array cause it should load every time when server loads
    useEffect(()=>{
        dispatch({type:"LOAD_FILTER_PRODUCTS",payload:products});

    },[products])

     //updateFilterValue for searching the products
   
    return (
    <FilterContext.Provider value={{...state,setGridView,setListView,sorting,updateFilterValue,clearFilters}}>
        {children}
</FilterContext.Provider>
);
}

export const useFilterContext=()=>{
    return useContext(FilterContext)
}