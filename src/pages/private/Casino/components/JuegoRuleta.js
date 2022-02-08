import React, { useState, useEffect } from 'react'
import './JuegoRuleta.css'
import { Wheel } from 'react-custom-roulette'
import bgImage from './cuchillo.jpeg'
import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../components/layout/Navbar'
import closeIcon from '../../../../scss/media/close.ac2aaa1a.svg'
import { Link } from 'react-router-dom'
import routes from '../../../../constants/routes.constants'
import styles from '../../Star/Table/Table.module.scss'

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
      setDinero(dinero + 5)
      console.log('has ganado 5€!')
      setResultado('has ganado 5€!')
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

  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={9}>
          <div>
            <Link to={routes.casino} className={styles.close}>
              <img src={closeIcon} alt="Close" />
            </Link>
            <div className={claseFondo}>
              <h1>{dinero}€</h1>

              <Wheel
                mustStartSpinning={activarRuleta}
                onStopSpinning={() => acabaRuleta()}
                prizeNumber={random}
                data={data}
                backgroundColors={['#3e3e3e', '#df3428']}
                textColors={['#ffffff']}
              />

              <button
                className={botonRuleta}
                onClick={() => {
                  girar()
                }}
              >
                Tirar
              </button>

              <br></br>
              <br></br>

              <h1>{resultado}</h1>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
export default JuegoRuleta
