import React, { useEffect, useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { Col, Form, Row } from 'react-bootstrap';
import {IBlockChain } from "@backend/models";

const App: React.FC = () => {

  const [data, setData] = useState<IBlockChain>();
  
  useEffect(() => {
    fetch('/chain')
    .then(response => response.json())
    .then(response => {
      console.log(response);
      setData(response)
    })
    .catch(error => console.log(error));
  }, []);
  
  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="header">
          Blockchain App
        </h1>
      </Jumbotron>
      <h2>Blockchains</h2>
 
      {data?.blocks.map(block => {
       return (
        <Form>
          <Form.Group as={Row} controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Block #
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={block.hash} />
          </Col>
        </Form.Group>
      
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>
      </Form>
       )
      })}
      
  
    </Container>
  );
};

export default App;
