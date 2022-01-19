import React from 'react'
import { Row, Col, Container } from 'reactstrap'

import NavBar from '../../../components/layout/Navbar'

import UserInfo from '../../../components/UserInfo'

const StarsUp = () => {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <UserInfo />
          <NavBar />
        </Col>
        <Col xl={9}>
          <div>grhdrhsh</div>
        </Col>
      </Row>
    </Container>
  )
}

export default StarsUp
