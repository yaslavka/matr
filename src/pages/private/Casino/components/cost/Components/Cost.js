import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../../components/layout/Navbar'
import MainPage from './MainPage'
import Spi from './Header'

function Cost() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={2} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col>
          <Spi />
          <MainPage />
        </Col>
      </Row>
    </Container>
  )
}
export default Cost
