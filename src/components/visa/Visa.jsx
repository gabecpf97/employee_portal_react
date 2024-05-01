import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVisa, getVisa } from "../../store/slices/visa.slice";

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
    formData.append("file", file);
    formData.append("step", visa.step);
    console.log(formData.get("file"));
    console.log(formData.get("step"));
    // try {
    //   const resposne = await fetch(`http://localhost:3000/visa/${visa._id}`, {
    //     method: "PUT",
    //     body: FormData,
    //     headers: {
    //       authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
    //     },
    //   });
    //   const data = await resposne.json();
    //   if (!resposne.ok) {
    //     console.log("handle error putting file in visa");
    //   } else {
    //     console.log(data);
    //   }
    // } catch (err) {
    //   console.log("handle error in updating with file");
    // }
  };

  return (
    <div className="visa">
      {visa && (
        <>
          <h2>your current status: {visa.step}</h2>
          <h3>Your documents:</h3>
          {visa.OPTReceipt.status !== "unuploaded" && (
            <p>OPTReceipt file here</p>
          )}
          {visa.OPTEAD.status !== "unuploaded" && <p>OPTEAD file here</p>}
          {visa.I983.status !== "unuploaded" && <p>I983 file here</p>}
          {visa.I20.status !== "unuploaded" && <p>I20 file here</p>}
          {visa[visa.step].status === "unuploaded" && (
            <h4>Please upload your {visa.step} document</h4>
          )}
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            ></input>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Visa;
