import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import React from 'react'
import './index.css'
import Spin from '../Header'
function Blaccd() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={9}>
          <Spin />
          <iframe
            src="https://demo.evoplay.games/demo/table/html5/evoplay/europeanroulette"
            width="100%"
            height="44%"
          />
        </Col>
      </Row>
    </Container>
  )
}
export default Blaccd
