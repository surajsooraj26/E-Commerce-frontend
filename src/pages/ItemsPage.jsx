// src/pages/ItemsPage.jsx
import React, { useEffect, useState } from "react";
import "./ItemsPage.css";
import { getItems } from "../api/itemApi";
import { addToCart } from "../api/cartApi";

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data } = await getItems(filters);
      setItems(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching items", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [filters]);

  const handleAddToCart = async (id) => {
    try {
      await addToCart(id, 1);
      alert("Item added to cart!");
    } catch (err) {
      console.error("Error adding to cart", err);
    }
  };

  return (
    <div className="home">
      <h1 className="">Items</h1>
      <a href="/cart">Go to Cart</a>

      {/* Filters */}
      <div className="search-form">
        <input
          type="text"
          placeholder="Category"
          className="border p-2 rounded"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min Price"
          className="border p-2 rounded"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="border p-2 rounded"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
        <button
          onClick={fetchItems}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </div>

      {/* Items List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-6 items-list">
          {items.map((item) => (
            <div key={item._id} className="border p-4 rounded shadow item-card">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-green-700 font-bold">₹{item.price}</p>
              <p className="text-sm text-gray-500">Category: {item.category}</p>
              <button
                onClick={() => handleAddToCart(item._id)}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemsPage;
