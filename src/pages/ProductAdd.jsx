import { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";

const ProductAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to add product");
      //   const data = await res.json();
      navigate("/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );

  return (
    <Layout>
      {error && (
        <p className="text-red-500 text-lg mb-4 font-semibold text-center">
          {error}
        </p>
      )}
      <ProductForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        title="Add Product"
        buttonText="Add Now"
      />
    </Layout>
  );
};

export default ProductAdd;
