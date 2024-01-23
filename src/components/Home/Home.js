import React, {Component} from "react";
import Icon from "../Common/Icon";
import {useNavigate} from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();

    return (
        <div className="splashscreen column gap">
            <div className="row gap">
                <Icon name="wallet"/>
                <div className="column">
                    <h2>Harding</h2>
                    <h1>Finances</h1>
                </div>
            </div>
            <button onClick={() => navigate('/login')}>Login</button>
        </div>
)
}
