import React from 'react';
import {Tag} from '../../Book/Book';
import "./TagContainer.css";

type Props = {
    tags: Tag[],
    deleteTag?: (tag: Tag)=>void,
}
const TagContainer = (props: Props) => {
    return(<div className={"tag-container"}>
            {props.tags.map(tag => (
                <div className={"tag " + (props.deleteTag ? "deletable-tag" : "non-deletable-tag")}>
                    <div className={"tag-name"}>{tag.name}</div>
                    {props.deleteTag && <div className={"tag-icon-container"}>
                        <i className="fas fa-times delete-tag-icon" onClick={() => props.deleteTag ? props.deleteTag(tag) : {}}/>
                    </div>}
                </div>
            ))}
        </div>)
}

export default TagContainer;
