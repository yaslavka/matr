import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../components/layout/Navbar'
import CountdownTimer from '../StarTrek/CountdownTimer/CountdownTimer'

function Casino() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={9}>
          <div className="startrek__title1">
            <span>До запуска осталось</span>
          </div>
          <div className="startrek__title">
            <CountdownTimer countdownTimestampMs={1659983662000} />
          </div>
        </Col>
      </Row>
    </Container>
  )
}
export default Casino
