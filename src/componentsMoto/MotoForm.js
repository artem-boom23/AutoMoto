import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveMoto, getMoto, updateMoto } from "../firebase/apiMoto";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
    url: "",
    name: "",
    year: "",
    weight: "",
    engine: "",
    speed: "",
    description: "",
};

export const MotoForm = (props) => {
    const [moto, setMoto] = useState(initialState);
    const params = useParams();
    const navigate = useNavigate();



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
        navigate("/");
    };

    const getLinkById = async (id) => {
        try {
            const doc = await getMoto(id);
            setMoto({ ...doc.data() });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (params.id) {
            getLinkById(params.id);
        }
    }, [params.id]);

    return (
        <div className="col-md-4 offset-md-4">
            <form onSubmit={handleSubmit} className="card card-body bg-secondary">
                <label htmlFor="url">Paste your URL</label>
                <div className="input-group mb-3">
                    <div className="input-group-text bg-dark">
                        <i className="material-icons">insert_link</i>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="https://someurl.xyz"
                        value={moto.url}
                        name="url"
                        onChange={handleInputChange}
                    />
                </div>

                <label htmlFor="name">Name your moto:</label>
                <div className="input-group mb-3">
                    <div className="input-group-text bg-dark">
                        <i className="material-icons">create</i>
                    </div>
                    <input
                        type="text"
                        value={moto.name}
                        name="name"
                        placeholder="Moto name"
                        className="form-control"
                        onChange={handleInputChange}
                    />
                </div>

                <label htmlFor="year">Year:</label>
                <div className="input-group mb-3">
                    <div className="input-group-text bg-dark">
                        <i className="material-icons">create</i>
                    </div>
                    <input
                        type="number"
                        value={moto.year}
                        name="year"
                        placeholder="year"
                        className="form-control"
                        onChange={handleInputChange}
                    />
                </div>

                <label htmlFor="engine">Engine:</label>
                <div className="input-group mb-3">
                    <div className="input-group-text bg-dark">
                        <i className="material-icons">create</i>
                    </div>
                    <input
                        type="text"
                        value={moto.engine}
                        name="engine"
                        placeholder="Engine"
                        className="form-control"
                        onChange={handleInputChange}
                    />
                </div>

                <label htmlFor="weight">Weight moto:</label>
                <div className="input-group mb-3">
                    <div className="input-group-text bg-dark">
                        <i className="material-icons">create</i>
                    </div>
                    <input
                        type="text"
                        value={moto.weight}
                        name="weight"
                        placeholder="Weight"
                        className="form-control"
                        onChange={handleInputChange}
                    />
                </div>

                <label htmlFor="speed">Max speed:</label>
                <div className="input-group mb-3">
                    <div className="input-group-text bg-dark">
                        <i className="material-icons">create</i>
                    </div>
                    <input
                        type="text"
                        value={moto.speed}
                        name="speed"
                        placeholder="Speed"
                        className="form-control"
                        onChange={handleInputChange}
                    />
                </div>

                <label htmlFor="description">Write a Description:</label>
                <textarea
                    rows="3"
                    className="form-control mb-3"
                    placeholder="Write a Description"
                    name="description"
                    value={moto.description}
                    onChange={handleInputChange}
                ></textarea>

                <button
                    className="btn btn-primary btn-block"
                    disabled={!moto.url || !moto.name}
                >
                    {props.currentId === "" ? "Save" : "Update"}
                </button>
            </form>
        </div>
    );
};