import React, {useContext} from "react";

export default function Icon({name, hover}) {

    const url = `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${name}/default/48px.svg`

    return (
        <div className={`icon-container ${hover ? 'hover': ''}`}>
            <span className="icon material-symbols-outlined">{name}</span>
        </div>
    )

}
