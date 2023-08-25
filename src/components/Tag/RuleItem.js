import React, {useContext, useState} from "react";
import ChildTag from "./ChildTag";
import Icon from "../Common/Icon";
import axios from "axios";
import Config from "../../Config";
import {AuthContext} from "../Auth/AuthContext";
import {TagContext} from "../Transactions/Transactions";

function removeRule(tags, ruleId) {
    tags.forEach(tag => {
        tag.rules = tag.rules.filter(rule => rule.id != ruleId)
        if (tag.childTags != null) {
            removeRule(tag.childTags, ruleId)
        }
    })
}

export default function RuleItem({rule}) {

    const {tagContext, setTagContext} = useContext(TagContext);
    const {authContext, setAuthContext} = useContext(AuthContext);

    const [expression, setExpression] = useState(rule.expression)

    const stopPropagation = (event) => event.stopPropagation();

    const del = async (event) => {
        event.stopPropagation();
        let newTagContext = {...tagContext}
        let tags = tagContext.tags

        removeRule(tags, rule.id);

        setTagContext(newTagContext);

        axios
            .patch(
                Config.Endpoints.Rules,
                {
                    tagId: rule.id
                },
                {headers: authContext.header()}
            )
            .then()
            .catch(error => console.log(error))

    }

    return (
        <div className="rule row">
            <Icon name="tune"/>
            <p>{rule.expression}</p>
            <div className="spacer"/>
            <button className="delete" onClick={del}><Icon name="delete"/></button>
        </div>
    )
}