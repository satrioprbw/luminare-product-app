import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-semibold text-primary">Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
