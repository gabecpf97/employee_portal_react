import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <h1>404: Page Not Found!</h1>
      <Link to="/">Go back to Homepage</Link>
    </div>
  );
}

export default PageNotFound;
