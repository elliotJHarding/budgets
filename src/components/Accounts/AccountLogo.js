import React from "react";
import './Accounts.css'


export default function AccountLogo({url, colour}) {
    return (
        <img
            className="logo"
            src={url}
            style={
                colour !== null ?
                {outlineColor: colour, outlineStyle: 'solid', outlineWidth: 3} :
                {outline: 'none'}
            }
        />
    )
}
