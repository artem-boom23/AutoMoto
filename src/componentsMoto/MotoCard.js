import { deleteMoto } from "../firebase/apiMoto";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function MotoCard({ link }) {
    const navigate = useNavigate();

    const onDeleteLink = async (id) => {
        if (window.confirm("Are you sure you want to delete this link?")) {
            await deleteMoto(id);
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
            onClick={() => navigate(`/editmoto/${link.id}`)}
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
                    <img className="w-100 img-thumbnail" src={link.url} alt={"moto"} />
                </a>
            </div>
            <div className="descr">
                <p>Year: {link.year}</p>
                <p>Engine: {link.engine}</p>
                <p>Max speed: {link.speed}</p>
                <p>Weight: {link.weight}</p>
                <p>Description: {link.description}</p>
            </div>
        </div>
    );
}
