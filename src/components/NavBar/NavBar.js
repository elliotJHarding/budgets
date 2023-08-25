import React, {useContext} from "react";
import NavItem from "./NavItem";
import NavMenu from "./NavMenu";
import './Navbar.css'
import {Auth, AuthContext} from "../Auth/AuthContext";
import {useNavigate} from "react-router-dom";

export function NavBar() {
    const {authContext, setAuthContext} = useContext(AuthContext);
    const navigate = useNavigate();


    return (
        <div className="navbar">
            <div className="navbar__header">
                <div className="navbar__group navbar__brand">
                    <span className="navbar__logo material-symbols-outlined">account_balance_wallet</span>
                    <h1 className="navbar__title">Finances</h1>
                </div>

            </div>
            <div className="navbar__links">
                <div className="navbar__group navbar__auth">
                    {authContext.authorized() || <NavItem link="/login" text="Login" icon="person"/>}
                    {authContext.authorized() && <NavItem link="/user" text="User" icon="person"/>}
                    {authContext.authorized() && <NavItem icon="logout" action={() => {authContext.logout()}}/>}
                </div>
                <div className="navbar__group">
                    <NavItem link="/transactions" text="Transactions" icon="text_snippet"/>
                </div>
                <div className="navbar__group">
                   <NavItem link="/budget" text="Budget" icon="data_usage"/>
                </div>
                <div className="navbar__group">
                    <NavItem link="/reports" text="Reports" icon="calendar_month"/>
                </div>
                <div className="navbar__group">
                    <NavItem link="/tags" text="Tags" icon="label"/>
                </div>
            </div>

        </div>
    )
}

