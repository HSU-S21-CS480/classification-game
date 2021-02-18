import React, { useEffect } from 'react';
//import {MouseEvent} from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';

interface QuestionModel {
  id: number,
  questionHeader: string,
  questionDescription: string,
  userResponse?: boolean,
  userChoices: {}
}

async function getQuestion(): Promise<QuestionModel> {
  const result = await axios.get('http://localhost:8080/api/question');
  const question: QuestionModel = result?.data?.data as QuestionModel;
  return question;
}

function QuestionAsker() {

  const buttonClick = (evt: React.MouseEvent<HTMLElement>, result) => {
    setModel({ ...model, userResponse: result });
  };

  const submitClick = async () => {
    const result = await axios.post(`http://localhost:8080/api/question/${model.id}`, model);
    setModel(await getQuestion());
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
      <React.Fragment>
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
            <Button className="btn-success" onClick={submitClick}>Submit</Button>
          </Col>
        </Row>
      </React.Fragment>
  );
}

export default QuestionAsker;
