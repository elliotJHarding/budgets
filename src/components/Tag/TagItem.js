import React, {useContext, useState} from "react";
import ChildTag from "./ChildTag";
import Icon from "../Common/Icon";
import axios from "axios";
import Config from "../../Config";
import {AuthContext} from "../Auth/AuthContext";
import {FilterContext, TagContext} from "../Transactions/Transactions";
import {motion} from "framer-motion";


export default function TagItem({tag, tagOnClick, tagOnDoubleClick, filter, includeSubTags, editable}) {

    const {authContext, setAuthContext} = useContext(AuthContext);
    const {tagContext, setTagContext} = useContext(TagContext);

    const [editMode, setEditMode] = useState(false);

    const [newName, setNewName] = useState(tag.name);
    const [newIcon, setNewIcon] = useState(tag.icon);


    const childTagItems = tag.childTags != null ? tag.childTags
        .filter(tagItem => filter != null && tagItem.name.toLowerCase().includes(filter.toLowerCase()))
        .map(tagItem => <ChildTag tag={tagItem} tagOnClick={tagOnClick}/>): [];

    const edit = async (event) => {
        event.stopPropagation();
        axios
            .patch(
                Config.Endpoints.Tags,
                {
                    tagId: tag.id,
                    name: newName,
                    icon: newIcon
                },
                {headers: authContext.header()}
            )
            .then((response) => {
                setEditMode(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const cancel = (event) => {
        event.stopPropagation();
        setEditMode(false);
    }

    const stopPropagation = (event) => event.stopPropagation();

    return (
        <div className="tag"
             onClick={event => tagOnClick != null && tagOnClick(event, tag)}
             onDoubleClick={event => tagOnDoubleClick != null && tagOnDoubleClick(event, tag)}>
            <div className="parent">
                {!editMode && <img src={tag.icon}/>}
                {!editMode && <p>{tag.name}</p>}
                {!editMode && editable && <div className="spacer"></div>}

                {editMode && <input className="edit" value={newIcon} onInput={e => setNewIcon(e.target.value)} onClick={stopPropagation} />}
                {editMode && <input className="edit" value={newName} onInput={e => setNewName(e.target.value)} onClick={stopPropagation}/>}
                {editMode && <button className="edit" onClick={edit}><Icon name="done"/></button>}
                {editMode && <button className="edit" onClick={cancel}><Icon name="cancel"/></button> }

                <div>
                {editable && !editMode && <button onClick={(e) => {e.stopPropagation();setEditMode(true)}}><Icon name="edit"/></button>}
                {editable && !editMode && <button className="delete"><Icon name="delete"/></button>}
                </div>
            </div>
            {includeSubTags && !editable && <div className="childTags">{childTagItems}</div>}
        </div>
    )
}