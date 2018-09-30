import React from "react";
import SaveBtn from "../../components/SaveBtn";

const Article = props => (
    <div className= "card">
        <h5 className="card-header">{props.topic}</h5>
        <div className="card-body">
            <h5 className="card-title">{props.date}</h5>
            <p className="card-text">{props.snippet}</p>
            <a href={props.url} className="btn btn-primary" target="_blank">Read</a>
            <SaveBtn onClick={() => this.props.saveArticle(props._id)} />
        </div>
    </div>
);

export default Article;
