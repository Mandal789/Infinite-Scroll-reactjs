const Reduser = (state, action) => {
  switch (action.type) {
    case "SETLOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "APPDATA":
      return {
        ...state,
        isLoading: false,
        filter_product: action.payload,
        Products: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_PRODUCTS":
      let { Products } = state;
      let tempFilterProduct = [...Products];

      const { text } = state.filters;

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.title.toLowerCase().includes(text.toLowerCase());
        });
      }
      return {
        ...state,
        filter_product: tempFilterProduct,
      };

    default:
      return state;
  }
};

export default Reduser;
