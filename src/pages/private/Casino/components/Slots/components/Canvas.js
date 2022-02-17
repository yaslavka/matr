import React from 'react'
import Constants from '../common/Constants'
import '../css/Canvas.css'
import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../../components/layout/Navbar'
import Spin from '../../Header'

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shuffledArrays: {},
    }
  }

  componentDidMount() {
    let allCanvas = document.querySelectorAll('canvas')
    let allimages = Constants.imgs

    function imagesLoaded(ctx, top, imagelist) {
      let height = Constants.imgDimensions.height
      let width = Constants.imgDimensions.width
      let left = Constants.imgDimensions.left

      for (let i = 0; i < imagelist.length; i++) {
        let topOfReel = imagelist[i]['top']
        let img = imagelist[i]['img']
        img.id = imagelist[i]['img']
        ctx.drawImage(img, left, topOfReel, width, height)
        ctx.save()
      }
    }

    let shuffledArraysObj = {}
    let reelnum = 0

    for (let c of allCanvas) {
      const ctx = c.getContext('2d')
      let topOfReel = Constants.imgDimensions.top

      //Get random arrays of images
      let shuffledImages = this.onShuffleArray(allimages)
      let imageReelsCount = 0
      let shuffledAllImgObj = []

      for (let i = 0; i < shuffledImages.length; i++) {
        let img = new Image()
        let imgsrc = shuffledImages[i]
        img.src = `${process.env.PUBLIC_URL}/images/${imgsrc}`
        shuffledAllImgObj.push({ img: img, top: topOfReel, name: imgsrc })

        //Make sure images are not stacked one on top of another
        topOfReel += Constants.reels.imgHeight
        img.onload = function () {
          //Make sure all images load before calling imagesLoaded Function
          imageReelsCount += 1
          if (imageReelsCount === allimages.length) {
            imagesLoaded(ctx, topOfReel, shuffledAllImgObj)
          }
        }
      }

      reelnum++
      let reelName = 'reel' + reelnum
      //Save image positions to later determine the winner
      shuffledArraysObj[reelName] = shuffledAllImgObj
    }

    this.setState({
      shuffledArrays: shuffledArraysObj,
    })
  }

  onShuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
  }

  render() {
    return (
      <Container className="root-page">
        <Row>
          <Col xl={3} className="d-none d-xl-block">
            <NavBar />
          </Col>
          <Col>
            <Spin />
            <iframe src="http://admiral/lobby/game/keks/" width="100%" height="44%"></iframe>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Canvas
