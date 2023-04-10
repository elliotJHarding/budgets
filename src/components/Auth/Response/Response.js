import React, {useCallback, useState} from 'react'
import './Response.css'


export default function Response(props) {
    return (
        <div className={`response ${props.visible ? 'show': ''}`}>
            <img src="https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/error/default/48px.svg"/>
            <p>{props.error}</p>
        </div>
    );
}