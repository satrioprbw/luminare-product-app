import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);
  return (
    <div className="w-50 bg-primary text-white p-5 flex flex-col">
      <Link to="/" className="mb-8 text-accent text-4xl italic">
        <span className="text-light font-bold">Lumi</span>nare
      </Link>

      <nav className="flex flex-col gap-4">
        <Link className="p-2 rounded hover:bg-secondary" to="/">
          Home
        </Link>
        <Link className="p-2 rounded hover:bg-secondary" to="/products">
          Product
        </Link>
      </nav>

      <button
        onClick={logout}
        className="cursor-pointer mt-auto p-2 rounded hover:bg-secondary text-left"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
