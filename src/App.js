import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.post("http://localhost:3001/products", { url });
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products", { params: { search } });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h2>🔍 Product Scraper</h2>

      {/* URL Input */}
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter product URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={fetchProductDetails}>Fetch Details</button>
      </div>

      {/* Product Details */}
      {product && (
        <div className="product-card">
          <h3>{product.title}</h3>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Rating:</strong> {product.rating} ⭐</p>
          <p><strong>No. of Ratings:</strong> {product.no_of_ratings}</p>
          <p><strong>No. of Reviews:</strong> {product.no_of_reviews}</p>
          <h4>Available Offers:</h4>
          <ul>
            {product.available_offers &&
              Object.entries(product.available_offers).map(([offerType, offers], index) => (
                <li key={index}>
                  <strong>{offerType}:</strong>
                  <ul>
                    {offers.map((offer, i) => <li key={i}>{offer}</li>)}
                  </ul>
                </li>
              ))}
          </ul>
          <a href={product.url} target="_blank" rel="noopener noreferrer">
            View Product ➜
          </a>
        </div>
      )}

      <hr />

      {/* Search Input */}
      <div className="input-group">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={fetchProducts}>Search</button>
      </div>

      {/* Display Products */}
      {Object.keys(products).length > 0 && (
        <div className="product-list">
          {Object.entries(products).map(([category, items]) => (
            <div key={category} className="category">
              <h4>{category}</h4>
              <ul>
                {items.map((item, index) => (
                  <li key={index} className="product-item">
                    <h4>{item.title}</h4>
                    <p><strong>Price:</strong> ₹{item.price}</p>
                    <p><strong>Rating:</strong> {item.rating} ⭐</p>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      View Product ➜
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
