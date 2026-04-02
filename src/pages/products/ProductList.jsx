import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import useProductStore from "../../store/useProductStore";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const search = useProductStore((state) => state.search);
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
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

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

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
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center pb-8">
          <h1 className="text-2xl font-semibold text-primary">Product List</h1>
          <Link
            to="/products/add"
            className="text-bold hover:text-accent text-lg text-secondary"
          >
            + Add New Product
          </Link>
        </div>
        <div className=" bg-white rounded-2xl border border-secondary overflow-hidden">
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
                  <td className="flex p-3 gap-3">
                    <Link
                      className="text-accent hover:text-light font-semibold"
                      to={`/products/${product.id}`}
                    >
                      View
                    </Link>
                    <Link
                      to={`/products/edit/${product.id}`}
                      className="text-accent hover:text-light font-semibold"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 cursor-pointer hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;
