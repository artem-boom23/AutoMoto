import { deleteAuto } from "../firebase/apiAuto";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function AutoCard({ link }) {
  const navigate = useNavigate();

  const onDeleteLink = async (id) => {
    if (window.confirm("are you sure you want to delete this link?")) {
      await deleteAuto(id);
      toast("Link Removed Successfully", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  return (
    <div
      className="card mb-3 card-website"
      key={link.id}
      onClick={() => navigate(`/edit/${link.id}`)}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h4>{link.name}</h4>
          <button
            className="btn btn-danger btn-sm mb-3 d-flex align-items-center"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteLink(link.id);
            }}
          >
            <i className="material-icons">close</i>
          </button>
        </div>
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          <img className="w-100 img-thumbnail" src={link.url} alt={"car"} />
        </a>
      </div>
      <div className="descr">
        <p>Year: {link.year}</p>
        <p>Engine volume: {link.engine}</p>
        <p>Power: {link.power}</p>
        <p>Description: {link.description}</p>
      </div>
    </div>
  );
}
