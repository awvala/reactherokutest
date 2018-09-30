import React from 'react';


const Article = props => (
    <div className= "list-group">
        <a href= {props.url} className= "bg light list-group-item list-group-item-action list-group-item-primary" target= "_blank">
            <h4>{props.title}</h4>
        </a>
    </div>
);

export default Article;
