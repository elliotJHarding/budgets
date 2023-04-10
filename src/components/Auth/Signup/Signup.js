import React, {useCallback, useState} from 'react'
import '../Auth.css'
import './Signup.css'
import axios from "axios";
import Config from '../../../Config'
import {getCsrfToken} from '../../../Utils'



export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('')

    const validatePassword = () => {

    }

    const createUserRequest = async () => {
        const response = await axios.post(
            Config.Endpoints.CreateUser,
            {
                username: username,
                password: password
            }
        )
    }

    return (
        <div className="auth-container">
            <div className="card card-auth">
                <input type="text" value={username} onInput={e => setUsername(e.target.value)} placeholder="Username"/>
                <input type="password" value={password} onInput={e => setPassword(e.target.value)} placeholder="Password"/>
                <input type="password" value={repeatPassword} onInput={e => setRepeatPassword(e.target.value)} placeholder="Repeat Password"/>
                <button onClick={createUserRequest}>Sign Up</button>
            </div>
        </div>
    );
}