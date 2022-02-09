import React from 'react'
import AppContext from '../context/AppContext'
import '../stylesheets/Menu.css'

const MenuItemOption = (props) => {
  // eslint-disable-next-line react/prop-types
  const { changeItem, currOption, option, optionText } = props
  return (
    <span
      className={`menu-item-option ${currOption === option ? 'current' : ''}`}
      onClick={
        currOption !== option
          ? (e) => {
              e.preventDefault()
              changeItem(option)
            }
          : null
      }
      style={{ cursor: currOption !== option ? 'pointer' : 'default' }}
    >
      {optionText}
    </span>
  )
}

const Menu = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    field,
    // eslint-disable-next-line react/prop-types
    username,
    // eslint-disable-next-line react/prop-types
    mode,
    // eslint-disable-next-line react/prop-types
    playersNumber,
    // eslint-disable-next-line react/prop-types
    changeName,
    // eslint-disable-next-line react/prop-types
    changeMode,
    // eslint-disable-next-line react/prop-types
    isPlaying,
    // eslint-disable-next-line react/prop-types
    changePlayersNumber,
    // eslint-disable-next-line react/prop-types
    startGame,
    // eslint-disable-next-line react/prop-types
    waitUsers,
    // eslint-disable-next-line react/prop-types
    saveUserSettings,
  } = props

  const input = React.createRef()

  const handleInputChange = (e) => {
    let { value } = e.target
    if (input.current.placeholder) input.current.placeholder = ''
    if (value) value = value[0].toUpperCase() + value.slice(1)
    changeName(value)
  }

  const handleSubmit = (lang) => {
    if (!username) {
      input.current.placeholder = lang === 'ru' ? 'Введите имя' : 'You should enter name'
      return
    }
    if (mode === 'single-player') {
      saveUserSettings()
      startGame()
    } else {
      saveUserSettings()
      waitUsers()
    }
  }

  const style = {
    // eslint-disable-next-line react/prop-types
    width: field.width - field.playerSpace * 2 + 'px',
    // eslint-disable-next-line react/prop-types
    height: field.width - field.playerSpace * 2 + 'px',
  }

  return (
    <AppContext.Consumer>
      {({ lang }) => (
        <div className={`menu ${isPlaying ? 'hide' : ''}`} style={style}>
          <h1>{lang === 'ru' ? 'Меню' : 'Menu'}</h1>
          <div className="menu-items">
            <label className="menu-item">
              <span className="menu-item-name">{lang === 'ru' ? 'Имя:' : 'Name:'}</span>
              <input ref={input} type="text" value={username} onChange={handleInputChange} />
            </label>
            <div className="menu-item">
              <span className="menu-item-name">{lang === 'ru' ? 'Играю:' : 'Mode:'}</span>
              <MenuItemOption
                changeItem={changeMode}
                currOption={mode}
                option="single-player"
                optionText={lang === 'ru' ? 'Один' : 'Single Player'}
              />
              <MenuItemOption
                changeItem={changeMode}
                currOption={mode}
                option="multiplayer"
                optionText={lang === 'ru' ? 'С друзьями' : 'Multiplayer'}
              />
            </div>
            <div className="menu-item">
              <span className="menu-item-name">{lang === 'ru' ? 'Игроков:' : 'Players:'}</span>
              <MenuItemOption
                changeItem={changePlayersNumber}
                currOption={playersNumber}
                option={2}
                optionText="2"
              />
              <MenuItemOption
                changeItem={changePlayersNumber}
                currOption={playersNumber}
                option={3}
                optionText="3"
              />
              <MenuItemOption
                changeItem={changePlayersNumber}
                currOption={playersNumber}
                option={4}
                optionText="4"
              />
              <MenuItemOption
                changeItem={changePlayersNumber}
                currOption={playersNumber}
                option={5}
                optionText="5"
              />
              <MenuItemOption
                changeItem={changePlayersNumber}
                currOption={playersNumber}
                option={6}
                optionText="6"
              />
            </div>
          </div>
          <button onClick={handleSubmit}>
            {mode === 'single-player'
              ? lang === 'ru'
                ? 'Играть'
                : 'Play'
              : lang === 'ru'
              ? 'Ждать Других Игроков'
              : 'Wait for Users'}
          </button>
        </div>
      )}
    </AppContext.Consumer>
  )
}

export default Menu
