import useAuthStore from "../store/useAuthStore";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  return (
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
  );
};

export default Navbar;
