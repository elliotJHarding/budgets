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
            <div className="navbar__group navbar__brand">
                <span className="navbar__logo material-symbols-outlined">account_balance_wallet</span>
                <h1 className="navbar__title">Finances</h1>
            </div>
            <div className="navbar__links">
                <div className="navbar__group">
                    <NavItem link="/transactions" text="Transactions" icon="text_snippet"/>
                    <NavItem link="/reports" text="Reports" icon="calendar_month"/>
                    <div className="navbar__spacer"></div>
                    {authContext.authorized() || <NavItem link="/login" text="Login" icon="person"/>}
                    {authContext.authorized() && <NavItem link="/user" icon="person"/>}
                    {authContext.authorized() && <NavItem icon="logout" action={() => {authContext.logout()}}/>}
                </div>
            </div>

        </div>
    )
}

