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
          <div className="startrek__title1">
            <h1 className="h1_investbox">Investment plans</h1>
          </div>
          <div className="investbox_page">
            <div className="quote">
              Invest your free coins to InvestBox! It’s a tool for devs to promote their coins. It’s
              NOT Pyramid/HYIP, all payments are made from special fund.
              <br />
              InvestBoxes can change status from Active to «No coins», but you can close your
              investment any time, it’s 100% safe.
              <br />
              InvestBoxes with «new» type - no investment close, you can only get daily percent.
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default StarsUp
