import React, { useEffect } from 'react'
import Header from './Header'
import Banner from './Banner'
import Authentication from './Authentication'
import Footer from './Footer'
import AOS from 'aos'
import 'aos/dist/aos.css'

function Home() {
  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])

  return (
    <div className="page">
      <Header />
      <Banner />
      <Authentication />
      <Footer />
    </div>
  )
}

export default Home
