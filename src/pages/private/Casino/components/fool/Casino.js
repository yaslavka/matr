import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Foo from './components/Header'
import Gamee from './components/f/components/App'
import NavBar from '../../../../../components/layout/Navbar'

function Fool() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col>
          <Foo />
          <Gamee width="100%" />
        </Col>
      </Row>
    </Container>
  )
}
export default Fool
