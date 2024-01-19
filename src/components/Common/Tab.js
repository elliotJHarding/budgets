import React, {Component} from "react";


export default function Tab({selected, text, onClick}) {
    return (
        <div className={`tab ${selected ? 'selected': ''}`} onClick={onClick}>
            <h2>{text}</h2>
        </div>
    )
}