import {useEffect, useState} from "react";
import {getMotos} from "../firebase/apiMoto";
import {MotoCard} from "./MotoCard";
import Layout from "../components/Layout";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase/config";
import {useNavigate} from "react-router-dom";

export const MotoList = () => {
    const [moto, setMoto] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (!user) navigate("/");
    }, [user, loading]);

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
