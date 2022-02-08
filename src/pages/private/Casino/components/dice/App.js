import React, { useEffect, useContext } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Content from './components/Content'
import configureStore, { history } from '../../../../../config/store'
import NavBar from '../../../../../components/layout/Navbar'
import { Col, Container, Row } from 'reactstrap'
import Hear from './components/Header'
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
          <>
            <CssBaseline />

            <Hear />
            <Content />
          </>
        </Col>
      </Row>
    </Container>
  )
}

export default DICE
