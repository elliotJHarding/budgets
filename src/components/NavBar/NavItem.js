import React, {Component} from "react";
import {Link} from "react-router-dom";


function NavItem(props) {
    return (
        <Link to={props.link} className="navbar__item">
            <div>
                {props.icon != undefined &&
                <img src={`https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${props.icon}/default/48px.svg`}/>
                }
                {props.text != undefined && <p>{props.text}</p>}
            </div>
        </Link>
)
}


export default NavItem;