import React, { useState } from "react";
//import { useAuthState } from "react-firebase-hooks/auth";
//import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
//import { auth, sendPasswordReset } from "./firebase";
import "./Reset.css";
import {sendPasswordReset} from "../firebase/config";

function Reset() {
    const [email, setEmail] = useState("");
//    const [user, loading, error] = useAuthState(auth);
//    const navigate = useNavigate();

//    useEffect(() => {
//        if (loading) return;
//        if (user) navigate("/dashboard");
//    }, [user, loading]);

    return (
        <div className="reset">
            <div className="reset__container">
                <input
                    type="text"
                    className="reset__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail адрес"
                />
                <button className="reset__btn"
                        onClick={() => sendPasswordReset(email)}
                >
                    Отправить письмо для сброса пароля
                </button>

                <div>
                   Ещё нет аккаунта? <Link to="/register">Регистрируйся</Link> сейчас!
                </div>
            </div>
        </div>
    );
}

export default Reset;
