import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveMoto, getMoto, updateMoto } from "../firebase/apiMoto";
import { useParams, useNavigate } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase/config";
import {InputAreaMoto} from "./InputAreaMoto";
import {TextareaDescription} from "../common/TextareaDescription";

const initialState = {
    url: "",
    name: "",
    year: "",
    weight: "",
    engine: "",
    speed: "",
    country: "",
    description: "",
};

const inputInitialState = [
    {
        name: "url",
        label: "Paste your URL",
        icon: "insert_link",
    },
    {
        name: "name",
        label: "Name your moto",
    },
    {
        name: "year",
        label: "Year",
        type: "number",
    },
    {
        name: "engine",
        label: "Engine",
    },
    {
        name: "weight",
        label: "Weight moto",
    },
    {
        name: "speed",
        label: "Max speed",
    },
    {
        name: "country",
        label: "Country",
    },
]

export const MotoForm = (props) => {
    const [moto, setMoto] = useState(initialState);
    const params = useParams();
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (!user) navigate("/");
    }, [user, loading]);

    useEffect(() => {
        if (params.id) {
            getLinkById(params.id);
        }
    }, [params.id]);

    const inputs = () => inputInitialState.map(item => (
        <InputAreaMoto
            moto={moto}
            name={item.name}
            label={item.label}
            icon={item.icon}
            type={item.type}
            handleInputChange={handleInputChange}
            placeholder={item.name}
        />
    ));

    const handleInputChange = ({ target: { name, value } }) => {
        setMoto({...moto, [name]: value});
    }

    const validURL = (str) => {
        var pattern = new RegExp(
            "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
            "i"
        ); // fragment locator
        return !!pattern.test(str);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validURL(moto.url))
            return toast("invalid url", { type: "warning", autoClose: 1000 });

        if (!params.id) {
            await saveMoto(moto);
            toast("New Link Added", {
                type: "success",
            });
        } else {
            await updateMoto(params.id, moto);
            toast("Updated", {
                type: "success",
            });
        }

        // Clean Form
        setMoto(initialState);
        navigate("/moto");
    };

    const getLinkById = async (id) => {
        try {
            const doc = await getMoto(id);
            setMoto({ ...doc.data() });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="col-md-4 offset-md-4 mb-5 mt-5 ">
            <form onSubmit={handleSubmit} className="card card-body bg-secondary">
                {inputs()}
                <TextareaDescription
                    object={moto}
                    handleInputChange={handleInputChange}
                />
                <button
                    className="btn btn-primary btn-block"
                    disabled={!moto.url || !moto.name}
                >
                    {params.id === undefined ? "Save" : "Update"}
                </button>
            </form>
        </div>
    );
};