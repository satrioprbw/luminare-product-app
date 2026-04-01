import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Home";
import useAuthStore from "./store/useAuthStore";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";

function App() {
  const user = useAuthStore((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/products"
          element={user ? <ProductList /> : <Navigate to="/login" />}
        />
        <Route
          path="/products/:id"
          element={user ? <ProductDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/products/add"
          element={user ? <ProductAdd /> : <Navigate to="/login" />}
        />
        <Route
          path="/products/edit/:id"
          element={user ? <ProductEdit /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
