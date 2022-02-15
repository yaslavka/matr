import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import React from 'react'
import Spio from '../../../../../components/Header'
import Appl from './App'

function Blacs() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={8}>
          <Spio />
          <Appl />
        </Col>
      </Row>
    </Container>
  )
}
export default Blacs
