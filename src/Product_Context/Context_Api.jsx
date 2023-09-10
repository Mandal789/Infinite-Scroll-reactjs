import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import reduser from "./Reduser";
import axios from "axios";
const AppContext = createContext();

const meta = [];
const initiastate = {
  isLoading: false,
  isError: false,
  Products: [],
  filter_product: [],
  filters: {
    text: "",
  },
};

const AppProvider = ({ children }) => {
  const [page, setpage] = useState(1);
  // const [data,setdata]=useState(meta)
  const [state, dispatch] = useReducer(reduser, initiastate);
  const API = `https://jsonplaceholder.typicode.com/photos?_limit=18&_page=${page}`;
  const getProduct = async (url) => {
    dispatch({ type: "SETLOADING" });
    try {
      const response = await axios.get(url);
      const alldata = await response.data;

      // setdata((prev)=>[...prev, ...alldata])
      // //(prev)=>[...prev, ...alldata]

      meta.push(...alldata);
      dispatch({ type: "APPDATA", payload: meta });  
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };

  useEffect(() => {
    getProduct(API)
  }, [page]);

  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
  }, [state.filters]);

  const handelScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight - 5
      ) {
        setpage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelScroll);
    return () => window.removeEventListener("scroll", handelScroll);
  }, []);

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
