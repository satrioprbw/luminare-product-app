import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import useProductStore from "../../store/useProductStore";

const ProductDetail = () => {
  const { id } = useParams();
  const products = useProductStore((state) => state.products);
  const product = products.find((p) => p.id === Number(id));

  if (!product)
    return (
      <Layout>
        <p className="text-red-600">Product not found</p>
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
