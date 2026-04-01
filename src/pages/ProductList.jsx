import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import useProductStore from "../store/useProductStore";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const search = useProductStore((state) => state.search);
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      if (!res.ok) {
        setError("Failed to Fetch Products");
        return;
      }
      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
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
        <p className="text-red-600">{error}</p>
      </Layout>
    );

  return (
    <Layout>
      <h1 className="mb-4 text-2xl font-semibold text-primary border-b border-primary pb-4">
        Product List
      </h1>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-secondary overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left bg-secondary text-white">
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="text-left text-sm even:bg-light/20"
              >
                <td className="p-3">{product.title}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">${product.price}</td>
                <td className="p-3">
                  <Link
                    className="text-accent font-semibold"
                    to={`/products/${product.id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ProductList;
