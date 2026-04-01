import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

    fetchProduct();
  }, [id]);

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
      <div className="max-w-5xl mx-auto ">
        <h1 className="mb-4 text-2xl font-semibold text-primary pb-4">
          {product.title}
        </h1>
        <Link to="/products" className="text-accent mb-4 inline-block">
          ← Back to Products
        </Link>
        <div className="flex max-w-300 mx-auto gap-6">
          <img src={product.images[0]} alt={product.title} className="w-60" />
          <div className="bg-light/20 p-4 rounded-2xl">
            <h2 className="font-semibold text-secondary">Category</h2>
            <p className="text-sm">{product.category}</p>
            <h2 className="font-semibold mt-4 text-secondary">Description</h2>
            <p className="text-sm">{product.description}</p>
            <h2 className="font-semibold mt-4 text-secondary">Price</h2>
            <p className="text-sm">${product.price}</p>
            <h2 className="font-semibold mt-4 text-secondary">Rating</h2>
            <p className="text-sm">⭐ {product.rating}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
