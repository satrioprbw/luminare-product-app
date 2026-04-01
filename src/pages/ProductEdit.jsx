import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
          console.log(formData);
    
      if (!res.ok) throw new Error("Failed to update");
      navigate("/products");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="mb-4 text-2xl font-semibold text-primary pb-4">
          Edit Product
        </h1>
        <Link to="/products" className="text-accent mb-4 inline-block">
          ← Back to Products
        </Link>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Title</label>
              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Category
              </label>
              <input
                required
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category"
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Price</label>
              <input
                required
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Description
              </label>
              <input
                required
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="cursor-pointer mt-6 bg-accent text-white px-6 py-2 rounded-lg"
          >
            Save Edit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ProductEdit;
