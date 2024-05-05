import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVisa, getVisa, setVisa } from "../../store/slices/visa.slice";
import { Box, Input, InputLabel, Button } from "@mui/material";

const Visa = () => {
  const dispatch = useDispatch();
  const visa = useSelector(getVisa.selectAll)[0];
  const [file, setFile] = useState("");

  useEffect(() => {
    dispatch(fetchVisa());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("document", file);
    formData.append("step", visa.step);
    try {
      const resposne = await fetch(`http://localhost:3000/visa/${visa._id}`, {
        method: "PUT",
        body: formData,
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await resposne.json();
      if (!resposne.ok) {
        console.log("handle error putting file in visa", data);
      } else {
        dispatch(setVisa(data.visa));
      }
    } catch (err) {
      console.log("handle error in updating with file", err);
    }
  };

  return (
    <div className="visa">
      {visa && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "15px",
            bgcolor: "#5da2e5",
            padding: "10px",
          }}
        >
          <h2>Your current Visa status</h2>
          <h3>
            {visa.step} Status: {visa[visa.step].status}
          </h3>
          <>
            {visa[visa.step].status === "rejected" && (
              <h3>Feedback: {visa[visa.step].feedback}</h3>
            )}
            {(visa[visa.step].status === "rejected" ||
              visa[visa.step].status === "unuploaded") && (
              <form onSubmit={(e) => handleSubmit(e)}>
                <InputLabel>File upload: </InputLabel>
                <Input
                  type="file"
                  variant="standard"
                  onChange={(e) => setFile(e.target.files[0])}
                ></Input>
                <Button size="small" variant="contained" type="submit">
                  Submit
                </Button>
              </form>
            )}
            <h3>Your documents:</h3>
            {visa.OPTReceipt.status !== "unuploaded" && (
              <>
                <p>OPTReceipt document: </p>
                <img src={visa.OPTReceipt.document} />
              </>
            )}
            {visa.OPTEAD.status !== "unuploaded" && (
              <>
                <p>OPTEAD document: </p>
                <img src={visa.OPTEAD.document} />
              </>
            )}{" "}
            {visa.I983.status !== "unuploaded" && (
              <>
                <p>OPTReceipt document: </p>
                <img src={visa.I983.document} />
              </>
            )}
            {visa.I20.status !== "unuploaded" && (
              <>
                <p>OPTReceipt document: </p>
                <img src={visa.I20.document} />
              </>
            )}
            {visa[visa.step].status === "unuploaded" && (
              <h4>Please upload your {visa.step} document</h4>
            )}
          </>
        </Box>
      )}
    </div>
  );
};

export default Visa;
