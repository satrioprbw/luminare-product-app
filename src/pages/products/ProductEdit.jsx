import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import ProductForm from "./ProductForm";
import useProductStore from "../../store/useProductStore";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);
  const editProduct = useProductStore((state) => state.editProduct);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = products.find((p) => p.id === Number(id));
        if (product) {
          setFormData(product);
        } else {
          const res = await fetch(`https://dummyjson.com/products/${id}`);
          if (!res.ok) {
            setError("Failed to Fetch Product");
            return;
          }
          const data = await res.json();
          setFormData(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, products]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: formData.price,
          category: formData.category,
        }),
      });

      if (!res.ok) throw new Error("Failed to update");
      editProduct(Number(id), formData);
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
        title="Edit Product"
        buttonText="Save Changes"
      />
    </Layout>
  );
};

export default ProductEdit;
