import {useEffect, useState} from "react";
import {getMotos} from "../firebase/apiMoto";
import {MotoCard} from "./MotoCard";
import Layout from "../components/Layout";

export const MotoList = () => {
    const [moto, setMoto] = useState([]);

    const getLinks = async () => {
        const querySnapshot = await getMotos();
        // onGetLinks((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id: doc.id});
        });
        setMoto(docs);
        // });
    };

    useEffect(() => {
        getLinks();
    }, []);

    return (
        <>
            <Layout/>
            {moto.map((link) => (
                <div className="col-md-4" key={link.id}>
                    <MotoCard link={link}/>
                </div>
            ))}
        </>
    );
};
