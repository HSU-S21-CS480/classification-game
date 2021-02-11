import React, { useEffect } from 'react';
//import {MouseEvent} from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

interface QuestionModel {
  questionHeader: string,
  questionDescription: string,
  userResponse?: boolean,
  userChoices: {}
}

async function getQuestion(): Promise<QuestionModel> {
  const result = await axios.get('http://localhost:8080/api/question');
  const question: QuestionModel = result?.data?.question as QuestionModel;
  return question;
}

function App() {

  const buttonClick = (evt: React.MouseEvent<HTMLElement>, result) => {
    setModel({ ...model, userResponse: result });
  };
  const [model, setModel] = React.useState({ questionHeader: "", questionDescription: "", userChoices: {} } as QuestionModel);

  //https://dev.to/silvestricodes/asynchronous-flows-with-react-hooks-1g0m
  useEffect(() => {
    async function getData() {
      const question: QuestionModel = await getQuestion();
      setModel(question);
    }
    getData()
  }, []);
  return (
    <div className="App">
      <Container>
        <Row className="mt-2">
          <Col>
            <h2>{model.questionHeader}</h2>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            {model.questionDescription}
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            {Object.keys(model.userChoices).map((keyName, i) => (
              <Button className="mx-1" key={keyName} onClick={(evt) => buttonClick(evt, keyName)}>{model.userChoices[keyName]}</Button>
            ))}
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Button className="btn-success" onClick={async () => setModel(await getQuestion())}>Submit</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
