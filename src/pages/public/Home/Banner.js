import React from 'react'
import Banne from '../../../scss/media/Daco_2105390.png'
import AOS from 'aos'
AOS.init()
AOS.refresh()
function Banner() {
  return (
    <div className="main-banner main-banner__logo" data-aos="flip-left">
      <img src={Banne} alt={Banne} width="1165" height="200" />
    </div>
  )
}

export default Banner
