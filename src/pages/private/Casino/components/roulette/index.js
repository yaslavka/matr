import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import Spio from '../../../../../components/Header'
function Roll() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={8}>
          <Spio />
          <iframe
            id="gameIframe"
            data-game="iframe"
            src="https://hhsee.24wulk-clb.com/game/fullstate/html5/evoplay/hottriplesevensspecial/?project=1049&amp;user_id=24761000&amp;demo=1&amp;wid=1&amp;s=1f3747b305305d440b4a3d80c5c3d26b"
            allowFullScreen=""
            allow="autoplay"
            width="100%"
            height="100%"
          ></iframe>
        </Col>
      </Row>
    </Container>
  )
}
export default Roll
