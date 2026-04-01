import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      if (!res.ok) {
        setError("Failed to Fetch Products");
        return;
      }
      const data = await res.json();

      setProduct(data);
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading)
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <h1 className="text-red-600">{error}</h1>
      </Layout>
    );
  return (
    <Layout>
      <h1 className="mb-4 text-2xl font-semibold text-primary border-b border-primary pb-4">
        {product.title}
      </h1>
      <Link to="/products" className="text-accent mb-4 inline-block">
        ← Back to Products
      </Link>
      <div className="flex max-w-300 mx-auto gap-6">
        <img src={product.images[0]} alt={product.title} className="w-60" />
        <div>
          <h2 className="font-semibold">Category</h2>
          <p className="text-sm">{product.category}</p>
          <h2 className="font-semibold mt-4">Description</h2>
          <p className="text-sm">{product.description}</p>
          <h2 className="font-semibold mt-4">Price</h2>
          <p className="text-sm">${product.price}</p>
          <h2 className="font-semibold mt-4">Rating</h2>
          <p className="text-sm">⭐ {product.rating}</p>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
