import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import React from 'react'
import Obe from './App'
import Spio from '../../../../../components/Header'

function Monk() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={8}>
          <Spio />
          <Obe />
        </Col>
      </Row>
    </Container>
  )
}
export default Monk
