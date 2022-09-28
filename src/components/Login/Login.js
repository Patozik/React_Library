import { useState } from "react";
import './Login.css';
import axios from "axios";
import useAuth from "../../hooks/useAuth";


function Login (props) {
    const [auth, setAuth] = useAuth();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [checkAdmin, setCheckAdmin] = useState(false);

    const changeLoginHandler = event => {
        const value = event.target.value;
        setLogin(value);
    }

    const changePasswordHandler = event => {
        const value = event.target.value;
        setPassword(value);
    }

    const loginHandler = async () => {
        try {
            if(!login || !password) setError(true);

            const res = await axios.post(process.env.REACT_APP_API_URL_USER+'login', { login, password });
            
            if(res.data.admin) {
                setCheckAdmin(false);
                setAuth({
                    login: res.data.login,
                    admin: res.data.admin
                });
            } else {
                setCheckAdmin(true);
                setPassword('');
            }
    
            setError(false);
        } catch (err) {
            setCheckAdmin(false);
            setError(true);
            setPassword('');
        }
    }

    return (
        <div className="login">
            <h2>Logowanie</h2>

            <label>Login</label>
            <input type="text" value={login} onChange={changeLoginHandler}></input>

            <label>Hasło</label>
            <input type="password" value={password} onChange={changePasswordHandler}></input>

            <button onClick={() => loginHandler()}>Zaloguj</button>

            {error
                ? <div className="error">Błędne dane logowania</div>
                : null
            }

            {checkAdmin
                ? <div className="error">Twoje konto nie posiada praw administratora</div>
                : null
            }

        </div>
    )
}

export default Login;