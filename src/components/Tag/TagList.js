import React from "react";
import '../Transactions/Transactions.css'
import {motion} from "framer-motion";
import './Tag.css'
import TagItem from "./TagItem";


export default function TagList({tags, filter, tagOnClick, tagOnDoubleClick, includeSubTags, editable}) {
    const tagItems = tags
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(tag => <TagItem key={tag.id} tag={tag} editable={editable} filter={filter} tagOnClick={tagOnClick} tagOnDoubleClick={tagOnDoubleClick} includeSubTags={includeSubTags}/>);

    return (
        <motion.div layout="position" className={`tagList`}>{tagItems}</motion.div>
    )
}
