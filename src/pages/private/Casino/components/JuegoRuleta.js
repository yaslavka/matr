import React, { useState, useCallback } from 'react'
import './JuegoRuleta.css'
import { Wheel } from 'react-custom-roulette'
import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../components/layout/Navbar'
import { formatter } from '../../../../utils'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../actions/finance.actions'
import Spin from './Header'

const data = [
  { option: 'COMODÍN', style: { textColor: 'white' } },
  { option: 'GANAS', style: { backgroundColor: 'green' } },
  { option: 'PIERDES', style: { backgroundColor: 'rgb(123, 0, 0)' } },
]

function JuegoRuleta() {
  var elegido = 1 // GANAS

  const [activarRuleta, setActivarRuleta] = useState()
  const [random, setRandom] = useState()
  const [dinero, setDinero] = useState(5)
  const [claseFondo, setClaseFondo] = useState('container-ruleta')
  const [resultado, setResultado] = useState()

  const [botonRuleta, setBotonRuleta] = useState('boton-ruleta')

  const girar = () => {
    setRandom(Math.floor(Math.random() * 3)) // si se quiere añadir dificultad, es tan simple con aumentar este ultimo numero

    setBotonRuleta('boton-ruleta-oculto')
    setResultado('')
    setDinero(dinero - 1)
    setActivarRuleta(true)
    setClaseFondo('container-ruleta-activo')
  }

  const acabaRuleta = () => {
    console.log('ruleta acabada')
    if (random === elegido) {
      setDinero(dinero + 2)
      console.log('has ganado €!')
      setResultado('has ganado €!')
    } else if (random === 0) {
      setDinero(dinero + 1)
      console.log('comodín')
      setResultado('comodín')
    } /* if(random !== elegido) */ else {
      console.log('has perdido ):')
      setResultado('has perdido ):')
    }

    setClaseFondo('container-ruleta')
    setBotonRuleta('boton-ruleta-')
    setActivarRuleta(false)
  }

  console.log(activarRuleta)
  console.log(random)
  const dispatch = useDispatch()
  const [isOperationsHistoryModalVisible, setIsOperationsHistoryModalVisible] = useState(false)
  const userInfo = useSelector((state) => state.app.user)

  const handleVisibleTransferMoneyModal = useCallback(() => {
    dispatch(actions.toggleTransferMoneyModal(true))
  }, [dispatch])

  const openOperationsHistoryModal = () => {
    document.body.style.overflow = 'hidden'
    setIsOperationsHistoryModalVisible(true)
  }

  const closeOperationsHistoryModal = () => {
    document.body.style.overflow = 'initial'
    setIsOperationsHistoryModalVisible(false)
  }

  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={9}>
          <Spin />
          <iframe src="http://admiral/lobby/game/cocktail/" width="100%" height="44%" />
        </Col>
      </Row>
    </Container>
  )
}
export default JuegoRuleta
