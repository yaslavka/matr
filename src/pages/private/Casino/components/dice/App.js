import React, { useEffect, useContext } from 'react'
import configureStore, { history } from '../../../../../config/store'
import NavBar from '../../../../../components/layout/Navbar'
import { Col, Container, Row } from 'reactstrap'
import Spin from '../Header'
export const store = configureStore()
function DICE() {
  const datos = useContext(store)

  useEffect(() => {
    const data = localStorage.getItem('paktolusCasino')

    if (data) {
      const data2 = JSON.parse(data)
      datos.restoreData(data2)
    }
  }, [])

  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={9}>
          <Spin />
          <iframe src="http://admiral/lobby/game/fairy_land/" width="100%" height="44%"></iframe>
        </Col>
      </Row>
    </Container>
  )
}

export default DICE
