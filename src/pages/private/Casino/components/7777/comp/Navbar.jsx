import React, { useState, useEffect } from 'react'
import logo_small from './images/paktolus_logo.jpeg'
import { Space, Image } from 'antd'
import { LoginOutlined, PlusCircleOutlined } from '@ant-design/icons'
import avatar from './images/avatar.png'

// eslint-disable-next-line react/prop-types
export default function Navbar({ islogin, setLogin, price, setUser, user }) {
  const [is_visible_login_model, setVisibleLoginModel] = useState(false)
  const [is_create_new_account, setCreateNewAccount] = useState(false)
  const [state, setstate] = useState({
    islogin: false,
    price: '',
  })

  useEffect(() => {
    setstate((preval) => {
      return {
        islogin: islogin,
        price: price,
      }
    })
  }, [islogin, price, user])

  return (
    <div>
      <nav
        className="navbar navbar-dark  alert-primary"
        // style={{
        //   backgroundColor: "transparent",
        // }}
        style={{
          backgroundImage: 'linear-gradient(to right,#10239e,#391085 , blue)',
        }}
      >
        <div className="container-fluid justify-content-between">
          <Space>
            {' '}
            <img
              src={logo_small}
              alt=""
              width="50"
              height="50"
              className="d-inline-block align-text-center rounded rounded-2 ant-card-hoverable"
            />
            {/* eslint-disable-next-line react/prop-types */}
            <h4 className="p-0 m-0 text-white">{user.name ? user.name : 'Paktolus'}</h4>
          </Space>

          <Space>
            {state.islogin ? (
              <>
                <span>
                  {/* eslint-disable-next-line react/prop-types */}
                  <h3 style={{ color: 'greenyellow' }}>${user.price || '00.00'}</h3>
                </span>
                <Image width={50} height={50} src={avatar} className="m-0 p-0" />
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => {
                    setLogin(false)
                    setUser({
                      name: '',
                      price: '',
                    })
                  }}
                >
                  <h4 className="m-0 text-white">
                    <Space align="center">
                      <LoginOutlined width="40px" className="m-0 p-0 " />
                      Logout
                    </Space>
                  </h4>
                </button>
              </>
            ) : (
              <Space>
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => {
                    setVisibleLoginModel(!is_visible_login_model)
                    setCreateNewAccount(false)
                  }}
                >
                  <h4 className="m-0 text-white">
                    <LoginOutlined width="50px" className="m-0 p-0 me-1 " />
                    Login
                  </h4>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => {
                    setVisibleLoginModel(!is_visible_login_model)
                    setCreateNewAccount(true)
                  }}
                >
                  <h4 className="m-0 text-white">
                    <PlusCircleOutlined width="50px" className="m-0 p-0 me-1 " />
                    Registred
                  </h4>
                </button>
              </Space>
            )}
          </Space>
        </div>
      </nav>
    </div>
  )
}
