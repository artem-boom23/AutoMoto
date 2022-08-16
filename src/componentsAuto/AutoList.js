import {useEffect, useState} from "react";
import {getAutos, onGetLinks} from "../firebase/apiAuto";
import {AutoCard} from "./AutoCard";
import Layout from "./Layout";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase/config";
import {useNavigate} from "react-router-dom";

export const AutoList = () => {
    const [auto, setAutos] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (!user) navigate("/");
    }, [user, loading]);


    // GetLinks подключен
    const getLinks = async () => {
        const querySnapshot = await getAutos();
        onGetLinks((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id: doc.id});
            });
            setAutos(docs);
        });
    };

    useEffect(() => {
        getLinks();
    }, []);

    return (
        <div class="container">
            <Layout/>
            <div className="row">
                {auto.map((link) => (
                    <div class="col-md-4" key={link.id}>
                        <AutoCard link={link}/>
                    </div>
                ))}
            </div>
        </div>
    );
};
