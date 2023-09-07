import React, { createContext, useContext, useEffect, useReducer } from "react";
import reduser from "./Reduser";
import axios from "axios";
const AppContext = createContext();
const API = "https://jsonplaceholder.typicode.com/photos";

const initiastate = {
  isLoading: false,
  isError: false,
  Products: [],
  filter_product:[],
  filters: {
    text: "",
  },
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reduser, initiastate);
  const getProduct = async (url) => {
    dispatch({ type: "SETLOADING" });
    try {
      const response = await axios.get(url);
      const alldata = await response.data;
      dispatch({ type: "APPDATA", payload: alldata });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };

  useEffect(() => {
    getProduct(API);
  }, []);
  // const filter=()=>{
  //   dispatch({ type: "FILTER_PRODUCTS" })
  // }

  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
    
  };

  

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
  }, [state.filters]);

  return (
    <AppContext.Provider value={{ ...state, updateFilterValue }}>
      {" "}
      {children}
    </AppContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
