import React from 'react';
import {Container, Row, Col, Alert} from 'react-bootstrap'

function Simple() {
  return (
    <div>
    <Container>
      <Row>
        <Col> {[
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
      ].map((variant) => (
        <Alert key={variant} variant={variant}>
          This is a {variant} alert—check it out!
        </Alert>
         ))}
        </Col>
        <Col>2 of 2</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
      
    </div>
  )
}

export default Simple;