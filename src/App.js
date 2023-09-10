import './App.css';
import ProductListing from './Component/productListing';
import { useProductContext } from './Product_Context/Context_Api';
function App() {
  const {isLoading}=useProductContext();
  return (
    <>
    <ProductListing/>
    
    {isLoading && <span className="loader"></span>}

    </>
  );
}

export default App;
