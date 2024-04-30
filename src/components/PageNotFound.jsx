import Link from "@mui/material/Link";

function PageNotFound() {
  return (
    <div>
      <h1>404: Page Not Found!</h1>
      <Link underline="none" href="/">
        Go back to Homepage
      </Link>
    </div>
  );
}

export default PageNotFound;
