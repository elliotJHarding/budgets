import React, {createContext, useContext, useState} from "react";
import NavItem from "./NavItem";
import NavMenu from "./NavMenu";
import './Navbar.css'
import {Auth, AuthContext} from "../Auth/AuthContext";
import {useNavigate} from "react-router-dom";

export const CollapsedContext = createContext();


export function NavBar() {
    const {authContext, setAuthContext} = useContext(AuthContext);
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(true)


    return (
        <CollapsedContext.Provider value={{collapsed, setCollapsed}}>
            <div className="navbar">
                <div className="navbar__header">
                    <div className="navbar__group navbar__brand">
                        <span className="navbar__logo material-symbols-outlined" onClick={e => setCollapsed(!collapsed)}>account_balance_wallet</span>
                        {!collapsed && <h1 className="navbar__title">Finances</h1>}
                    </div>

                </div>
                <div className="navbar__links">
                    <div className="navbar__group navbar__auth">
                        {authContext.authorized() || <NavItem link="/login" text="Login" icon="person"/>}
                        {authContext.authorized() && <NavItem link="/user" text="User" icon="person"/>}
                        {authContext.authorized() && !collapsed && <NavItem icon="logout" action={() => {authContext.logout()}}/>}
                    </div>
                    <div className="navbar__group">
                        <NavItem link="/transactions" text="Transactions" icon="text_snippet"/>
                    </div>
                    <div className="navbar__group">
                       <NavItem link="/budgets" text="Budget" icon="data_usage"/>
                    </div>
                    <div className="navbar__group">
                        <NavItem link="/reports" text="Reports" icon="calendar_month"/>
                    </div>
                    <div className="navbar__group">
                        <NavItem link="/tags" text="Tags" icon="label"/>
                    </div>
                    <div className="navbar__group">
                        <NavItem link="/holidays" text="Holidays" icon="travel"/>
                    </div>
                </div>
            </div>
        </CollapsedContext.Provider>
    )
}

