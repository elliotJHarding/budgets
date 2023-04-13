import React, {useContext} from "react";
import NavItem from "./NavItem";
import NavMenu from "./NavMenu";
import './Navbar.css'
import {AuthContext} from "../Auth/AuthContext";

export function NavBar() {
    const {authContext, setAuthContext} = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="navbar__group navbar__brand">
                <img className="navbar__logo" src="https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/account_balance_wallet/default/48px.svg"/>
                <h1 className="navbar__title">Finances</h1>
            </div>
            <div className="navbar__links">
                <div className="navbar__group">
                    <NavItem link="/transactions" text="Transactions" icon="text_snippet"/>
                    <NavItem link="/reports" text="Reports" icon="calendar_month"/>
                    <div className="navbar__spacer"></div>
                    {authContext.authorized() || <NavItem link="/login" text="Login" icon="person"/>}
                    {authContext.authorized() && <NavItem link="/user" icon="person"/>}
                    {authContext.authorized() && <NavItem icon="logout"/>}
                </div>
            </div>

        </div>
    )
}

