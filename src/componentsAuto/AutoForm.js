import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveAuto, getAuto, updateAuto } from "../firebase/apiAuto";
import { useParams, useNavigate } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase/config";
import {InputArea} from "./InputArea";
import {TextareaDescription} from "../common/TextareaDescription";

const initialState = {
  url: "",
  name: "",
  year: "",
  engine: "",
  power: "",
  country: "",
  description: "",
};

const inputInitState = [
  {
    name: "url",
    label: "Paste your URL",
    icon: "insert_link",
  },
  {
    name: "name",
    label: "Name your car",
  },
  {
    name: "year",
    label: "Year",
    type: "number",
  },
  {
    name: "engine",
    label: "Engine volume",
  },
  {
    name: "power",
    label: "Power",
  },
  {
    name: "country",
    label: "Country",
  },
]

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

  useEffect(() => {
    console.log("params.id: ", params.id);
    if (params.id) {
      getLinkById(params.id);
    }
  }, [params.id]);

  const inputs = () => inputInitState.map(item => (
     <InputArea
      auto={auto}
      name={item.name}
      label={item.label}
      icon={item.icon}
      type={item.type}
      handleInputChange={handleInputChange}
      placeholder={item.name}
     />
  ));

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


  return (
    <div className="col-md-4 offset-md-4">
      <form onSubmit={handleSubmit} className="card card-body bg-secondary mt-5 mb-5">
        {inputs()}
        <TextareaDescription
            object={auto}
            handleInputChange={handleInputChange}
        />
        <button
          className="btn btn-primary btn-block"
          disabled={!auto.url || !auto.name}
        >
          {params.id === undefined ? "Save" : "Update"}
        </button>
      </form>
    </div>
  );
};
