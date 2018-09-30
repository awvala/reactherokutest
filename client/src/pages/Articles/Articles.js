import React, { Component } from "react";
// import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import Article from "../../components/Article/Article";

class Articles extends Component {
    state = {
        articles: [],
        topic: "",
        startYear: "",
        endYear: "",
        page: 0,
        currentSearch: ""
    };

    loadArticles = () => {
        API.getArticles()
            .then(res =>
                this.setState({
                    articles: res.data,
                })
            )
            .catch(err => console.log(err));
    };

    saveArticle = (article) => {
        let newArticle = {
            date: article.pub_date,
            topic: article.headline.main,
            url: article.web_url
        }

        API.saveArticles(newArticle).then(articles => {
            //removing the saved article from the articles in state
            let unsavedArticles = this.state.articles.filter(article => article.headline.main !== newArticle.topic)
            this.setState({ articles: unsavedArticles })
        })
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        let { topic, startYear, endYear } = this.state;
        let query = { topic, startYear, endYear }
        this.getArticles(query)
    };

    getArticles = query => {
        if (query.topic !== this.state.currentSearch.topic || query.startYear !== this.state.currentSearch.startYear || query.endYear !== this.state.currentSearch.endYear) {
            this.setState({
                articles: []
            })
        }

        let { topic, startYear, endYear } = query;
        let queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&page=${this.state.page}`;
        let APIkey = "&api-key=82b9bb53e0504de1bbc493474a966560"

        if (topic.indexOf(' ') >= 0) {
            topic = topic.replace(/\s/g, '+');
        }

        if (topic) {
            queryURL += `&fq=${topic}`
        }

        if (startYear) {
            queryURL += `&begin_date=${startYear}0101`
        }

        if (endYear) {
            queryURL += `&end_date=${endYear}1231`
        }

        queryURL += APIkey;

        API.queryNYTAPI(queryURL).then(results => {
            //console.log(results);
            this.setState({
                articles: results.data.response.docs,
                currentSearch: query,
                topic: '',
                startYear: '',
                endYear: ''
            });
            console.log(this.state.articles);
        })
            .catch(err => console.log(err))
    }

    getAdditionalResults = () => {
        let { topic, startYear, endYear } = this.state.currentSearch;
        let query = { topic, startYear, endYear }
        let page = this.state.page;
        page++
        this.setState({
            page: page
        }, function () {
            this.getArticles(query)
        });
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>
                                New York Times Search
                            </h1>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col size="sm-12">
                        <form>
                            <Input
                                value={this.state.topic}
                                onChange={this.handleInputChange}
                                name="topic"
                                placeholder="Topic (required)"
                            />
                            <Input
                                value={this.state.startYear}
                                onChange={this.handleInputChange}
                                name="startYear"
                                placeholder="Start Date (YYYYMMDD) (required)"
                            />
                            <Input
                                value={this.state.endYear}
                                onChange={this.handleInputChange}
                                name="endYear"
                                placeholder="End Date (YYYYMMD) (required)"
                            />
                            <FormBtn
                                disabled={!(this.state.topic && this.state.startYear && this.state.endYear)}
                                onClick={this.handleFormSubmit}
                            >
                                Search
                            </FormBtn>
                        </form>
                    </Col>
                    <Col size="sm-12">
                        <Jumbotron>
                            <h1>
                                Returned Articles
                            </h1>
                        </Jumbotron>
                        {this.state.articles.length
                            ? <Row>
                                <Col size="sm-12">
                                    {this.state.articles.map((article) =>
                                        <Article
                                            key= {article._id}
                                            topic={article.headline.main}
                                            _id={article._id}
                                            url={article.web_url}
                                            snippet={article.snippet}
                                            date={article.pub_date}
                                            saveArticle={this.saveArticle}
                                        />
                                    )}
                                </Col>
                            </Row>
                            : <h3>No Results to Display</h3>
                        }
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Articles;