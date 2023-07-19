import React, {Component} from "react";
import {Link} from "react-router-dom";


function NavItem(props) {
    return (
        <Link to={props.link} className="navbar__item">
            <div onClick={props.action}>
                {props.icon != undefined &&
                    <span className="icon material-symbols-outlined">{props.icon}</span>
                }
                {props.text != undefined && <p>{props.text}</p>}
            </div>
        </Link>
)
}


export default NavItem;