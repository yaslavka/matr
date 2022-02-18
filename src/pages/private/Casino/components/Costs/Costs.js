import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import Spi from '../cost/Components/Header'
import React from 'react'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Costs() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={8}>
          <Spi />
          <iframe src="http://admiral/lobby/game/gnom/" width="100%" height="44%"></iframe>
        </Col>
      </Row>
    </Container>
  )
}
export default Costs
