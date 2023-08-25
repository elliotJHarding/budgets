import React from "react";

export default function ChildTag({tag, tagOnClick}) {

    return (
        <div className="childTag" onClick={event => tagOnClick(event, tag)}>
            <img src={tag.icon}/>
            <p>{tag.name}</p>
        </div>
    )
}