import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer";

// procedure to use the contextAPI
// 1.create the context using createContext 
// 2.create the provider for that and return <AppContext.Provider value={{MyName:"hari"}}>

// the value passed is available for any components
// 3.use custom hook inoreder to get the value
// 4.export all the AppContext,provider and useContext

// wrap the appProvider in index.js file =><AppProvider> 

const AppContext = createContext();
const API = "https://api.pujakaitem.com/api/products";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading:false,
  //initiating as a object cause its the data 
  //of a singleProduct it's a object not an array
  singleProduct:{},
};

const AppProvider = ({ children }) => {

  //reducer is a part that found in productreducer component
  const [state, dispatch] = useReducer(reducer, initialState);

  // dipatcher just tells the work to be done
  //it calls the action method


  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      // it returns promises and we make use of
      //  async await in order to deal with the promises
      const res = await axios.get(url);
      const products = await res.data;
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  //second api call for the single product with 
  //multiple images


  const getSingleProduct=async(url)=>{
    dispatch({ type: "SET_SINGLE_LOADING" });
    try{
        const res=await axios.get(url);
        //data is a object not part of the api
        const singleProduct=await res.data;
        dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });

    }
    catch(error){
        dispatch({ type: "SET_SINGLE_ERROR" });
    }

  }

  //get single product is not in useEffect hook 
  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state,getSingleProduct }}>{children}</AppContext.Provider>
  );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };