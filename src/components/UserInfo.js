import React from 'react'
import { useSelector } from 'react-redux'
import classnames from 'classnames'

import bell from '../scss/media/bell.e5471636.svg'
import Avatar from '../components/Avatar'

// eslint-disable-next-line react/prop-types
function UserInfo({ className }) {
  const userInfo = useSelector((state) => state.app.user)

  return (
    <div className={classnames('user-info', className)}>
      {userInfo && (
        <>
          <Avatar
            className="user-info__avatar"
            url={userInfo.avatar && `${process.env.REACT_APP_BASE_URL}${userInfo.avatar}`}
          />
          <div className="user-info__names">
            <div>{`${userInfo.firstName} ${userInfo.lastName}`}</div>
            <span>{userInfo.username}</span>
          </div>
          <div className="user-info__bell">
            <img src={bell} alt="" />
          </div>
        </>
      )}
    </div>
  )
}

export default UserInfo
