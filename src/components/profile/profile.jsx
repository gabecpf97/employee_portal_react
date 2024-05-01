// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { setUsername } from "../store/slices/user.slice";
// import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
// import { Input, Button } from "@mui/material";

function Profile() {
    const status = localStorage.getItem("status");
    console.log(status)

  return (
    <>
        <p>user info here, status is {localStorage.getItem("status")}, userId is {localStorage.getItem("userId")}</p>
    </>
  );
}

export default Profile;