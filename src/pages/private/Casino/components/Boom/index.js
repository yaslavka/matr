import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import React from 'react'
import Boom from './App'
import Spio from '../../../../../components/Header'
import './index.css'

function Booom() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={8}>
          <Spio />
          <Boom />
        </Col>
      </Row>
    </Container>
  )
}
export default Booom
