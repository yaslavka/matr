import React, { useState } from 'react'
import PlayingCard from './PlayingCard'
import { Modal, Space, Card, Button, Alert, Spin } from 'antd'

// eslint-disable-next-line react/prop-types
export default function PlayGame({ setPlay, islogin, user, setUser }) {
  const [random_no, setRandomNo] = useState(['3', '3', '3'])
  const [message, setMessage] = useState('Playing with casino ...')
  const [isloading, setLoading] = useState(false)

  const spinHandler = () => {
    setMessage('Please wait...')
    // eslint-disable-next-line react/prop-types
    if (parseFloat(user.price) < 2) {
      alert('You dont have sufficient balance')
      setMessage('You dont have sufficient balance')
      return
    }
    if (!isloading) {
      setLoading(true)
      console.log(Math.floor((Math.random() * 10) / 3))
      const randno = []
      for (let i = 0; i < 3; i++) {
        randno.push(Math.floor((Math.random() * 10) / 3).toString())
      }
      let result = '0'
      if (randno[0] == '3' && randno[1] == '3' && randno[2] == '3') {
        console.log('you won 5& ')
        setMessage('Congratulation you won 5$ ')
        result = '5'
      } else {
        if (randno[0] == randno[1] && randno[1] == randno[2]) {
          console.log('all are equal')
          setMessage('Congratulation you won 2$')
          result = '2'
        } else {
          if (randno[0] == randno[1] || randno[1] == randno[2] || randno[2] == randno[0]) {
            console.log('any two are equals')
            setMessage('Congratulation you won 0.5$ ')
            result = '0.5'
          } else {
            console.log('you losses sorry')
            setMessage('Sorry You loss ')
          }
        }
      }

      setTimeout(() => {
        if (islogin) {
          // eslint-disable-next-line react/prop-types
          const total_price = parseFloat(user.price) - parseFloat('2.00') + parseFloat(result)
          setUser((preval) => ({ ...preval, price: total_price.toFixed(2) }))
          localStorage.setItem(
            // eslint-disable-next-line react/prop-types
            user.id,
            // eslint-disable-next-line react/prop-types
            user.password + '=' + user.name + '=' + total_price.toFixed(2),
          )
          // eslint-disable-next-line react/prop-types
          const history = localStorage.getItem(user.id + '-history')
          if (history) {
            localStorage.setItem(
              // eslint-disable-next-line react/prop-types
              user.id + '-history',
              history + randno[0] + '-' + randno[1] + '-' + randno[2] + '-' + new Date() + '=',
            )
          } else {
            localStorage.setItem(
              // eslint-disable-next-line react/prop-types
              user.id + '-history',
              randno[0] + '-' + randno[1] + '-' + randno[2] + '-' + new Date() + '=',
            )
          }
        }
        setRandomNo(randno)
        console.log('result:', result)
        setLoading(false)
      }, 2000)

      console.log(randno)
    }
  }

  return (
    <Modal
      footer={null}
      onCancel={() => {
        setPlay(false)
      }}
      visible={true}
      bodyStyle={{
        padding: '0px',
        margin: '0px',
        textAlign: 'center',
        backgroundColor: 'blue',
      }}
      closable={false}
      style={{
        padding: '0px',
        width: '700px',
      }}
      maskClosable={false}
      width="700px"
    >
      <Card
        style={{
          backgroundImage: 'linear-gradient(180deg, #003a8c,#722ed1, #096dd9)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100%',
        }}
        headStyle={{ border: 'none' }}
        title={
          <div className="d-block">
            <h2 className="">
              <span
                className=" p-1 px-4 ant-card-hoverable  rounded border  rounded-pill  text-white"
                style={{
                  backgroundImage: 'linear-gradient(to right,blue, #391085)',
                  textShadow: '2px 2px 2px red',
                }}
              >
                {isloading ? 'Please wait...' : message}
              </span>
            </h2>
            {/* eslint-disable-next-line react/prop-types */}
            <span style={{ fontSize: '40px', color: 'white' }}>${user.price || '00.00'}</span>
          </div>
          // <div >
          //   <Alert
          //     message={isloading ? "Please wait..." : message}
          //     type="success"
          //     size="large"
          //     showIcon
          //     closable
          //   />
          //   <span style={{ fontSize: "40px", color: "white" }}>
          //     ${user.price || "00.00"}
          //   </span>
          // </div>
        }
      >
        <div>
          <Space>
            <Spin spinning={isloading} size="large">
              <PlayingCard option={random_no[0]} size="large" />
            </Spin>
            <Spin spinning={isloading}>
              <PlayingCard option={random_no[1]} size="large" />
            </Spin>
            <Spin spinning={isloading}>
              <PlayingCard option={random_no[2]} size="large" />
            </Spin>
          </Space>
          <h6 className="text-white mt-4 ">
            <b>Note: </b>
            <i> Each spin costs $2 from your balance</i>
          </h6>
          <div className="d-flex justify-content-around mt-3">
            {' '}
            <Button
              size="large"
              shape="round"
              className="ant-card-hoverable border-0"
              style={{
                backgroundImage: 'linear-gradient(to right,blue,#722ed1)',
                height: '50px',
                width: '150px',
              }}
              onClick={() => {
                console.log('clicked')
                spinHandler()
              }}
            >
              <b style={{ fontSize: '24px' }}>Spin</b>
            </Button>
            <Button
              size="large"
              shape="round"
              className="ant-card-hoverable border-0"
              style={{
                backgroundImage: 'linear-gradient(to right,blue,#722ed1)',
                height: '50px',
                width: '200px',
              }}
              onClick={() => {
                console.log('clicked')
                setRandomNo(['3', '3', '3'])
              }}
            >
              <b style={{ fontSize: '24px' }}>Reset</b>
            </Button>
            <Button
              size="large"
              shape="round"
              className="ant-card-hoverable border-0"
              style={{
                backgroundImage: 'linear-gradient(to right,blue,#722ed1)',
                height: '50px',
                width: '150px',
              }}
              onClick={() => {
                console.log('clicked')
                setPlay(false)
              }}
            >
              <b style={{ fontSize: '24px' }}>Cancel</b>
            </Button>
          </div>
        </div>
      </Card>
    </Modal>
  )
}
