import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import Article from "../../components/Article";

class SavedArticles extends Component {
  state = {
    savedArticles: []
  };

  componentDidMount() {
    this.getSavedArticles();
  };

  getSavedArticles = () => {
    //console.log("here");
    API.getArticles().then(res => 
      this.setState({
        savedArticles: res.data
      })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteArticles(id)
      .then(res => this.getSavedArticles())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h2>
                Saved Articles
                </h2>
            </Jumbotron>
            {this.state.savedArticles.length > 0
              ? <Row>
                <Col size="sm-12">
                  {this.state.savedArticles.map((article) =>
                    <Article
                      key={article._id}
                      topic={article.topic}
                      _id={article._id}
                      url={article.url}
                      snippet={article.snippet}
                      date={article.date}
                    />
                  )}
                </Col>
              </Row>
              : <h3>There are no saved articles.</h3>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SavedArticles;