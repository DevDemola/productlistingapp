import React, { useState, useEffect } from "react";
import "./ProductGallery.css";

const ProductGallery = () => {
  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="gallery">
      {products.map((product) => (
        <div className="card" key={product.id}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGallery;
