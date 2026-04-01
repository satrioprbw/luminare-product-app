import useAuthStore from "../store/useAuthStore";

const Home = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="flex h-screen">
      <div className="w-50 bg-primary text-white p-5 flex flex-col">
        <div className="mb-8 text-accent text-4xl italic">
          <span className="text-light">Lumi</span>nare

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

      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-white border-b flex items-center justify-between px-5">
          <div className="w-80 flex items-center border rounded-2xl px-3  gap-3 bg-gray-50">
            <img src="/search.svg" alt="search" className="h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="text-sm w-full py-1 outline-none bg-transparent"
            />
          </div>
          <div className="flex gap-2 justify-center items-center">
          <img src={user.image} alt="user image" className="h-6 w-6" />
          <p className="text-secondary font-bold">
            {user.firstName} {user.lastName}
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
