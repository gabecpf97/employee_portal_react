import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>HR project</h1>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Home;
