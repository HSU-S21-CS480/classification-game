import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import QuestionAsker from './views/QuestionAsker/index';
import AboutView from './views/About/index';
import DetailsView from './views/Details/index';
import './App.css';

function App() {

  return (
    <Router>
      <div className="App">
        <Container>
          <Row>
            <Col>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>
        </Container>


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <AboutView />
          </Route>
          <Route path="/details/:id" children={<DetailsView />} />
          <Route path="/">
            <QuestionAsker />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
