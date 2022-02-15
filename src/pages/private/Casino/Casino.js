import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../components/layout/Navbar'
import CountdownTimer from '../StarTrek/CountdownTimer/CountdownTimer'
import { Link } from 'react-router-dom'
import routes from '../../../constants/routes.constants'
import bgImage from './components/cuchillo.jpeg'
import bgImag from './components/obesyn/mm.png'
import bgIma from './img/mmm.png'
import bgIm from './img/11.png'
import bg from './components/Boom/images/bomb.svg'
import blac from './components/blac/assets/poker-chip.png'
import blaac from './components/vvvvv/assets/img/hexa.png'

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
          <h1 className="startrek__title1">ИГРЫ</h1>
          <Container>
            <Link to={routes.rollet}>
              {' '}
              <img src={bgImage} alt="" width="15%" />
              Спинер
            </Link>
            <Link to={routes.dice}>
              {' '}
              <img src={bgImage} alt="" width="15%" />
              DICE
            </Link>
            <Link to={routes.fool}>
              {' '}
              <img src={bgImage} alt="" width="15%" />
              Fool
            </Link>
            <Link to={routes.slots}>
              {' '}
              <img src={bgImage} alt="" width="15%" />
              Slots
            </Link>
            <Link to={routes.barr}>
              {' '}
              <img src={bgImage} alt="" width="15%" />
              BAR
            </Link>
            <Link to={routes.cost}>
              {' '}
              <img src={bgIm} alt="" width="15%" />
              COST
            </Link>
            <Link to={routes.costs}>
              {' '}
              <img src={bgIma} alt="" width="15%" />
              COSTS
            </Link>
            <Link to={routes.obes}>
              {' '}
              <img src={bgImag} alt="" width="15%" />
              MONKEY
            </Link>
            <Link to={routes.boom}>
              {' '}
              <img src={bg} alt="" width="15%" />
              BOOM
            </Link>
            <Link to={routes.blac}>
              {' '}
              <img src={blac} alt="" width="15%" />
              BLAK
            </Link>
            <Link to={routes.blaac}>
              {' '}
              <img src={blaac} alt="" width="15%" />
            </Link>
            <Link to={routes.blaacb}>
              <img src={blaac} alt="" width="15%" />
            </Link>
            <Link to={routes.blaa}>
              <img src={blaac} alt="" width="15%" />
            </Link>
            <Link to={routes.lacs}>
              <img src={blaac} alt="" width="15%" />
            </Link>
            <Link to={routes.sas}>
              <img src={blaac} alt="" width="15%" />
            </Link>
            <Link to={routes.sasn}>
              <img src={blaac} alt="" width="15%" />
            </Link>
            <Link to={routes.roll}>
              <img src={blaac} alt="" width="15%" />
            </Link>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}
export default Casino
