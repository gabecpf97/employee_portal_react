import { Typography } from "@mui/material";
function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h2">Welcome to our App.</Typography>
    </div>
  );
}

export default Home;
