import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import "./Login.css";
import {auth, logInWithEmailAndPassword, signInWithGoogle} from "../firebase/config";
import {useAuthState} from "react-firebase-hooks/auth";

// TODO: Дописать логику авторизации
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/auto");
    }, [user, loading]);

    return (
        <div className="login">
            <div className="login__container">
                <input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail адрес"
                />
                <input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль"
                />
                <button
                    className="login__btn"
                    onClick={() => logInWithEmailAndPassword(email, password)}
                >
                    Войти
                </button>
                <button className="login__btn login__google" onClick={signInWithGoogle}>
                    Войти с помощью Google
                </button>
                <div>
                    <Link to="/reset">Забыли пароль?</Link>
                </div>
                <div>
                    Ещё нет аккаунта? <Link to="/register">Регистрируйся</Link> сейчас!
                </div>
            </div>
        </div>
    );
}

export default Login;
