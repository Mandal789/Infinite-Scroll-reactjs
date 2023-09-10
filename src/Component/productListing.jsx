import React from "react";
import "../App.css";
//import App from "../App";
import { useProductContext } from "../Product_Context/Context_Api";
const ProductListing = () => {
  const {
    filters: { text },
    filter_product,
    updateFilterValue,
  } = useProductContext();

  return (
    <>
      <div className="input-container">
        <input
          type="text"
          name="text"
          placeholder="Search By Title"
          value={text}
          onChange={updateFilterValue}
          className="input-box"
        />
        <p style={{ marginTop: "60px", textTransform: "capitalize" }}>
          total length of Data : 5000
        </p>
      </div>

      <div className="item_container">
        {filter_product.map((item) => {
          return (
            <div key={item.id} className="item">
              <img src={item.thumbnailUrl} alt="" width={200} height={127} />

              <p style={{ margin: "0" }}>{item.title}</p>
              <div style={{ display: "flex", gap: "150px", width: "10%" }}>
                <p>{item.albumId}</p>
                <p>{item.id}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductListing;
