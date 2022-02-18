import React, { Component } from 'react'
import AppContext from '../context/AppContext'
import websocket from '../websocket'
import '../stylesheets/WaitPage.css'

class WaitPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      joinedUsers: [],
      userConfirms: false,
      allUsersConfirm: false,
    }

    this.cancel = this.cancel.bind(this)
    this.confirm = this.confirm.bind(this)
  }

  updateJoinedUsers(joinedUsers) {
    this.setState({ joinedUsers })
  }

  confirm() {
    this.setState({ userConfirms: true })
    websocket.send({ type: 'confirm' })
  }

  allUsersConfirm() {
    // eslint-disable-next-line react/prop-types
    this.props.startMultiplayGame()
  }

  cancel() {
    // eslint-disable-next-line react/prop-types
    this.props.cancelWaiting()
    websocket.close()
  }

  connectToWebsocket() {
    websocket.connect()
    websocket.listen((type, msgObj) => {
      if (type === 'message') {
        if (msgObj.type === 'joinedUsers') this.updateJoinedUsers(msgObj.data.joinedUsers)
        if (msgObj.type === 'allUsersConfirm') this.allUsersConfirm()
      }
      if (type === 'closed') this.cancel()
    })
    websocket.send({
      type: 'addData',
      // eslint-disable-next-line react/prop-types
      username: this.props.username,
      // eslint-disable-next-line react/prop-types
      groupSize: this.props.playersNumber,
    })
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/prop-types
    if (!prevProps.isWaiting && !prevProps.isPlaying && this.props.isWaiting) {
      this.connectToWebsocket()
      this.setState({ joinedUsers: [], userConfirms: false, allUsersConfirm: false })
    }
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { field, isWaiting, playersNumber } = this.props
    const { joinedUsers, userConfirms } = this.state
    const { lang } = this.context
    const style = {
      // eslint-disable-next-line react/prop-types
      width: field.width - field.playerSpace * 2 + 'px',
      // eslint-disable-next-line react/prop-types
      height: field.width - field.playerSpace * 2 + 'px',
    }

    return (
      <div className={`wait-page ${!isWaiting ? 'hide' : ''}`} style={style}>
        <h1>{lang === 'ru' ? 'Ожидание Игроков' : 'Wait for Users'}</h1>
        <img src="/images/loading.png" />
        <div className="info">
          {Array.from({ length: playersNumber }).map((user, i) => (
            <div
              className={`user-block ${joinedUsers[i] && joinedUsers[i].confirm ? 'confirm' : ''}`}
              key={i}
            >
              {joinedUsers[i] ? joinedUsers[i].username : ''}
            </div>
          ))}
        </div>
        <div className="buttons">
          <button className="cancel-button" onClick={this.cancel}>
            {lang === 'ru' ? 'Отмена' : 'Cancel'}
          </button>
          {joinedUsers.length === playersNumber && !userConfirms && (
            <button className="confirm-button" onClick={this.confirm}>
              {lang === 'ru' ? 'Подтвердить' : 'Confirm'}
            </button>
          )}
        </div>
      </div>
    )
  }
}
WaitPage.contextType = AppContext

export default WaitPage
