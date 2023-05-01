import React, {useCallback, useContext, useState} from 'react'
import './Login.css'
import Config from "../../../Config";
import axios from "axios";
import Response from "../Response/Response";
import {Auth, AuthContext} from "../AuthContext";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";

export default function Login() {
    const {authContext, setAuthContext} = useContext(AuthContext);
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [response, setResponse] = useState({
        text: "No response",
        visible: false
    })

    const authenticateRequest = async () => {
        axios.post(
            Config.Endpoints.ObtainToken,
            {
                username: username,
                password: password
            })
            .then((response) => {
                if (response.status == 200) {
                    setAuthContext(new Auth(response.data.token));
                    navigate("/user");
                }
            })
            .catch((error) => {
                console.log(error)
                if (error.code == "ERR_NETWORK") {
                    setResponse({
                        text: "Server Unavailable",
                        visible: true
                    })
                }
                else if (error.response.status == 400) {
                    setResponse({
                        text: "Invalid Login",
                        visible: true
                    })
                }
            })
    }

    return (
        <motion.div layout layoutId="page" className="auth-container">
            <div className="card card-auth">
                <input type="text" value={username} onInput={e => setUsername(e.target.value)} placeholder="Username"/>
                <input type="password" value={password} onInput={e => setPassword(e.target.value)} placeholder="Password"/>
                <div className="button-group">
                    <button onClick={authenticateRequest}>Login</button>
                    <button className="neutral" onClick={() => {navigate('/signup')}}>Sign Up</button>
                    <Response error={response.text} visible={response.visible}/>
                </div>
            </div>
        </motion.div>
    );
}