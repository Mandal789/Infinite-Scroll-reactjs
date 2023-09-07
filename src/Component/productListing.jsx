import React, { Fragment } from "react";
import { useProductContext } from "../Product_Context/Context_Api";
const ProductListing = () => {
  const {
    filters: { text },
    filter_product,
    updateFilterValue,
  } = useProductContext();
  return (
    <>
      <div style={{ marginLeft: "30%" }}>
        <input
          type="text"
          name="text"
          placeholder="Search"
          value={text}
          onChange={updateFilterValue}
          style={{ width: "50%", marginTop: "50px", padding: "1rem 0" }}
        />
      </div>
      <div>
        <div
          style={{
            display: "flex",
            gap: "5px",
            color: "black",
            flexDirection: "column",
            marginLeft: "100px",
            marginTop: "50px",
          }}
        >
          {filter_product.map((item) => {
            return (
              <div key={item.id} style={{ display: "flex", gap: "150px" }}>
                <p>{item.albumId}</p>
                <p>{item.id}</p>
                <p>{item.title}</p>
                <img src={item.url} alt="" width={80} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductListing;
