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
        console.log("handle error putting file in visa");
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log("handle error in updating with file");
    }
  };

  return (
    <div className="visa">
      {visa && (
        <>
          <h2>
            your current status for {visa.step}: {visa[visa.step].status}
          </h2>
          {visa[visa.step].status === "rejected" && (
            <h3>{visa[visa.step].feedback}</h3>
          )}
          <h3>Your documents:</h3>
          {visa.OPTReceipt.status !== "unuploaded" && (
            <p>{visa.OPTReceipt.document}</p>
          )}
          {visa.OPTEAD.status !== "unuploaded" && <p>{visa.OPTEAD.document}</p>}
          {visa.I983.status !== "unuploaded" && <p>{visa.I983.document}</p>}
          {visa.I20.status !== "unuploaded" && <p>{visa.I20.document}</p>}
          {visa[visa.step].status === "unuploaded" && (
            <h4>Please upload your {visa.step} document</h4>
          )}
          {visa[visa.step].status === "rejected" && (
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              ></input>
              <button type="submit">Submit</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default Visa;
