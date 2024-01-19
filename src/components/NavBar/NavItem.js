import React, {Component, useContext} from "react";
import {Link} from "react-router-dom";
import {CollapsedContext} from "./NavBar";


function NavItem(props) {
    const {collapsed, setCollapsed} = useContext(CollapsedContext);

    return (
        <Link to={props.link} className="navbar__item hover">
            <div onClick={props.action}>
                {props.icon !== undefined &&
                    <span className="icon material-symbols-outlined">{props.icon}</span>
                }
                {!collapsed && props.text !== undefined && <p>{props.text}</p>}
            </div>
        </Link>
)
}


export default NavItem;