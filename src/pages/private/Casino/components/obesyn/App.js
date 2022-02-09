import React from 'react'
import { Provider } from 'react-redux'
import store from './store'

import styled from 'styled-components'
import SlotMachine from '../../../../../components/SlotMachine'

const Container = styled.section`
  display: flex;
  justify-content: center;
`

function Obe() {
  return (
    <Provider store={store}>
      <Container>
        <SlotMachine />
      </Container>
    </Provider>
  )
}

export default Obe
