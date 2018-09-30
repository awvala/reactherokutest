import React from "react";
const moment = require('moment');

const Article = props => (
    <div className= "card" id={props._id}>
        <h5 className="card-header">{props.topic}</h5>
        <div className="card-body">
            <h5 className="card-title" id="date">{moment(props.date).format("MMMM Do YYYY")}</h5>
            <p className="card-text" id="snippet">{props.snippet}</p>
            <a href={props.url} className="btn btn-primary" id="articleurl" target="_blank">Read</a>
            <button
                className= "btn btn-primary"
                type="button"
                onClick={() => props.saveArticle(props._id)} 
                >Save Article
            </button>
        </div>
    </div>
);

export default Article;
