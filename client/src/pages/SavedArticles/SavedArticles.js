import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import Article from "../../components/Article";

class Detail extends Component {
    state = {
      savedArticles: {}
    };
    // When this component mounts, grab the article with the _id of this.props.match.params.id
    // e.g. localhost:3000/article/599dcb67f0f16317844583fc
    componentDidMount() {
      this.loadArticles();
    };

    loadArticles = () => {
        API
          .getArticles()
          .then(results => {
            this.setState({savedArticles: results.data})
          })
      };
  
    render() {
      return (
        <Container fluid>
          <Row>
            <Col size="md-12">
              <Jumbotron>
                <h1>
                  Saved Articles
                </h1>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col size="md-10 md-offset-1">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title"><strong><i class="fa fa-table"></i>   Saved Articles</strong></h3>
                </div>  
                <div class="panel-body" id="well-section">
                { this.state.savedArticles.length > 0 ?
                  (this.state.savedArticles.map((article, i) => (
                    <Article
                      key={i}
                      title={article.title}
                      url={article.url}
                      date={article.date}
                    />
                    )
                  )) : <h1>There are no saved articles.</h1>
                }
                </div>
            </div>
            </Col>
          </Row>
        </Container>
      );
    }
  }
  
  export default Detail;