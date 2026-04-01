import useAuthStore from "../store/useAuthStore";

const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);
  return (
    <div className="w-50 bg-primary text-white p-5 flex flex-col">
      <div className="mb-8 text-accent text-4xl italic">
        <span className="text-light font-bold">Lumi</span>nare
      </div>

      <nav className="flex flex-col gap-4">
        <a className="p-2 rounded hover:bg-secondary" href="/">
          Home
        </a>
        <a className="p-2 rounded hover:bg-secondary" href="/products">
          Product
        </a>
      </nav>

      <button
        onClick={logout}
        className="mt-auto p-2 rounded hover:bg-secondary text-left"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
