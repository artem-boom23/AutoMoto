import {Link, useLocation} from "react-router-dom";
import {AiOutlineSave} from "react-icons/ai";
import {SiFirebase} from "react-icons/si";
import {logout} from "../firebase/config";

export const Navbar = () => {
    const param = useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand d-flex" to="/">
                    <SiFirebase size="1.5rem" className="me-2"/>
                    Auto
                </Link>

                <Link className="navbar-brand d-flex ms-5" to="/moto">
                    Moto
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item d-flex flex-row-reverse">
                            {
                                param.pathname === "/moto" ?
                                    <Link
                                        className="d-flex align-items-center btn btn-primary shadow-none"
                                        to="/addmoto"
                                    >
                                        <AiOutlineSave className="me-1" size="1.5rem"/>
                                        Save a Moto
                                    </Link>
                                    :
                                    <Link
                                        className="d-flex align-items-center btn btn-primary shadow-none"
                                        to="/add"
                                    >
                                        <AiOutlineSave className="me-1" size="1.5rem"/>
                                        Save a Car
                                    </Link>}

                            <button
                                className="d-flex align-items-center btn  shadow-none "
                                onClick={logout}
                            >
                                <AiOutlineSave className="me-1" size="1.5rem"/>
                                Log out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};
