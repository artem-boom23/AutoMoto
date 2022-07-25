import React, {useEffect, useState} from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import {Link} from "react-router-dom";
//import {auth, registerWithEmailAndPassword, signInWithGoogle,} from "./firebase";
import "./Register.css";
import classnames from "classnames";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [name, setName] = useState("");
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        if (password === repeatPassword && password.length) {
            setShowButton(true )
        } else {
            setShowButton(false )
        }
    }, [password, repeatPassword]);

//    const [user, loading, error] = useAuthState(auth);
//    const navigate = useNavigate();

//    const register = () => {
//        if (!name) alert("Please enter name");
//        registerWithEmailAndPassword(name, email, password);
//    };

//    {
//        showButton ?
//            <button
//                className="register__btn"
//                onClick={check}>
//                Register
//            </button> : <></>
//    }

//    useEffect(() => {
//        if (loading) return;
//        if (user) navigate("/dashboard");
//    }, [user, loading]);

    const check = () => {
        if (showButton) {
            alert ("Вы успешно зарегестрированы!")
        } else {
            alert("Пароли не совпадают")
        }
    }

    return (
        <div className="register">
            <div className="register__container">
                <input
                    type="text"
                    className="register__textBox"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Полное имя"
                />
                <input
                    type="text"
                    className="register__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail адрес"
                />
                <input
                    type="password"
                    className="register__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль"
                />
                <input
                    type="password"
                    className="register__textBox"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    placeholder="Повторите пароль"
                />

                <button className={classnames({
                    ["inactive"]: !showButton,
                    ["active"]: showButton,
                })}
                        onClick={check}
                    //onClick={register}
                >
                    Register
                </button>
                <button
                    className="register__btn register__google"
                    //onClick={signInWithGoogle}
                >
                    Зарегистрироваться через Google
                </button>

                <div>
                    Уже есть аккаунт? <Link to="/">Войдите</Link> сейчас!
                </div>
            </div>
        </div>
    );
}

export default Register;