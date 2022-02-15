import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import Spio from '../../../../../components/Header'
import React from 'react'
import App from './comp/App'

function Sas() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={8}>
          <Spio />
          <App />
        </Col>
      </Row>
    </Container>
  )
}
export default Sas
