import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import Spio from '../../../../../components/Header'
function Roll() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={9}>
          <Spio />
          <iframe src="http://admiral/lobby/game/cocktail/" width="100%" height="100%" />
        </Col>
      </Row>
    </Container>
  )
}
export default Roll
