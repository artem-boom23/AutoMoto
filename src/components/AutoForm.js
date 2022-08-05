import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveAuto, getAuto, updateAuto } from "../firebase/apiAuto";
import { useParams, useNavigate } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase/config";

const initialState = {
  url: "",
  name: "",
  year: "",
  engine: "",
  power: "",
  description: "",
};

export const AutoForm = (props) => {
  const [auto, setAuto ] = useState(initialState);
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

  const handleInputChange = ({ target: { name, value } }) => {
    setAuto({...auto, [name]: value});
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

    if (!validURL(auto.url))
      return toast("invalid url", { type: "warning", autoClose: 1000 });

    if (!params.id) {
      await saveAuto(auto);
      toast("New Link Added", {
        type: "success",
      });
    } else {
      await updateAuto(params.id, auto);
      toast("Updated", {
        type: "success",
      });
    }

    // Clean Form
    setAuto(initialState);
    navigate("/");
  };

  const getLinkById = async (id) => {
    try {
      const doc = await getAuto(id);
      setAuto({ ...doc.data() });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("params.id: ", params.id);
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
            value={auto.url}
            name="url"
            onChange={handleInputChange}
          />
        </div>

        <label htmlFor="name">Name your car:</label>
        <div className="input-group mb-3">
          <div className="input-group-text bg-dark">
            <i className="material-icons">create</i>
          </div>
          <input
            type="text"
            value={auto.name}
            name="name"
            placeholder="Car name"
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
              value={auto.year}
              name="year"
              placeholder="year"
              className="form-control"
              onChange={handleInputChange}
          />
        </div>

        <label htmlFor="engine">Engine volume:</label>
        <div className="input-group mb-3">
          <div className="input-group-text bg-dark">
            <i className="material-icons">create</i>
          </div>
          <input
              type="text"
              value={auto.engine}
              name="engine"
              placeholder="Engine"
              className="form-control"
              onChange={handleInputChange}
          />
        </div>

        <label htmlFor="power">Power:</label>
        <div className="input-group mb-3">
          <div className="input-group-text bg-dark">
            <i className="material-icons">create</i>
          </div>
          <input
              type="text"
              value={auto.power}
              name="power"
              placeholder="Power"
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
          value={auto.description}
          onChange={handleInputChange}
        ></textarea>

        <button
          className="btn btn-primary btn-block"
          disabled={!auto.url || !auto.name}
        >
          {props.currentId === "" ? "Save" : "Update"}
        </button>
      </form>
    </div>
  );
};
