import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";
// TODO: Дописать логику авторизации
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
//    const [user, loading, error] = useAuthState(auth);
//    const navigate = useNavigate();

//    useEffect(() => {
//        if (loading) {
//            // maybe trigger a loading screen
//            return;
//        }
//        if (user) navigate("/dashboard");
//    }, [user, loading]);

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
                //    onClick={() => logInWithEmailAndPassword(email, password)}
                >
                    Войти
                </button>
                <button className="login__btn login__google" >
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
