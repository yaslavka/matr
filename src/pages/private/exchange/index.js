import React from 'react'
import { Row, Col, Container } from 'reactstrap'

import NavBar from '../../../components/layout/Navbar'
import Nav from './components/Nav'
import Chart from './components/Chart/Chart'
import './stoc.css'
import BuyFormComponent from './components/Form/BuyForm'
import SellFormComponent from './components/Form/SellForm'
import Market from './components/Market/Market'
import HistoriBuySel from './components/Market/HistoriBuySel'

const Exchange = () => {
  return (
    <Container className="root-page">
      <Row>
        <m className="d-none d-xl-block col-xl-38">
          <NavBar />
        </m>
        <Col xl={9}>
          <Nav />
          <Chart />
          <BuyFormComponent />
          <SellFormComponent />
          <Market />
          <HistoriBuySel />
        </Col>
      </Row>
    </Container>
  )
}

export default Exchange
