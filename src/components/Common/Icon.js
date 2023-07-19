import React, {useContext} from "react";

export default function Icon(props) {

    const url = `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${props.name}/default/48px.svg`

    return (
        <div className="icon-container">
            <span className="icon material-symbols-outlined">{props.name}</span>
        </div>
    )

}
