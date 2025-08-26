import React, { useState, useEffect } from "react";

const SimpleShop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.in/api/products");
        const data = await res.json();

        const catRes = await fetch("https://fakestoreapi.in/api/products/category");
        const catData = await catRes.json();
    console.log(data)
        if (data.status === "SUCCESS") setProducts(data.products);
        if (data.status === "SUCCESS") setCategories(catData.categories);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  const displayedProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (p) =>
            p.category &&
            p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🛒Simple Shop</h1>

      
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setSelectedCategory("all")}>All</button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{ marginLeft: "10px" }}
          >
            {cat}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
            />
            <h3 style={{ fontSize: "16px" }}>{product.title}</h3>
            <p style={{ fontWeight: "bold" }}>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleShop;
