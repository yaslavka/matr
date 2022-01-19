import React from 'react'
import ReactDOM from 'react-dom'
import { YMInitializer } from 'react-yandex-metrika'
import { BrowserRouter as Router, BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'

// Update DateJS
import isBetween from 'dayjs/plugin/isBetween'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'

import App from './App'
import configureStore, { history } from './config/store'
import reportWebVitals from './reportWebVitals'
import 'react-toastify/dist/ReactToastify.css'
import 'react-image-lightbox/style.css'
import './config/i18n'
import './scss/styles.css'
//import './pages/private/exchange/index.scss';

export const store = configureStore()
dayjs.extend(isBetween)
dayjs.extend(timezone)
dayjs.extend(utc)

let __PERFORMANCE_DEVTOOL__
if (__PERFORMANCE_DEVTOOL__) {
  const { registerObserver } = require('react-perf-devtool')
  registerObserver()
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router>
        <App history={history} />
        <ToastContainer />
        {process.env.REACT_APP_ENV === 'production' && (
          <YMInitializer
            accounts={[83436040]}
            options={{
              accurateTrackBounce: true,
              trackLinks: true,
              clickmap: true,
              webvisor: true,
            }}
            version="2"
          />
        )}
      </Router>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
