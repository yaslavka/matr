import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import React from 'react'
import Spio from '../../../../../components/Header'
import './index.css'
import Board from './Components/Board'
function Blaccd() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={9}>
          <Spio />
          <Board />
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
export default Blaccd
