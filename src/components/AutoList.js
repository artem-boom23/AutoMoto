import { useEffect, useState } from "react";
import { getAutos } from "../firebase/apiAuto";
import { AutoCard } from "./AutoCard";
import Layout from "./Layout";

export const AutoList = () => {
  const [auto, setAutos] = useState([]);
  console.log("Auto list")

  const getLinks = async () => {
    const querySnapshot = await getAutos();
    // onGetLinks((querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setAutos(docs);
    // });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      <Layout />
      {auto.map((link) => (
        <div className="col-md-4" key={link.id}>
          <AutoCard link={link} />
        </div>
      ))}
    </>
  );
};
