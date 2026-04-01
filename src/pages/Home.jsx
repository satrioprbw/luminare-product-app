
import useAuthStore from '../store/useAuthStore';

const Home = () => {
    const user = useAuthStore((state) => state.user);
    if (user) {
    return (
      <h1>
        Welcome {user.firstName} {user.lastName}
      </h1>
    );
  }
  return (
    <h1>Home</h1>
  )
}

export default Home