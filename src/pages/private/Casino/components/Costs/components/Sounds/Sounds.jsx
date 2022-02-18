/**
 * Slot Spinner - Game
 *
 * @category   Application_Frontend
 * @package    slot-spinner
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

// sound manager
function sound(src) {
  let soundObj = document.createElement('audio')
  soundObj.src = src
  soundObj.setAttribute('preload', 'auto')
  soundObj.setAttribute('controls', 'none')
  soundObj.style.display = 'none'
  document.body.appendChild(soundObj)
  return soundObj
}

// winning sound
export function winning() {
  const obj = sound('/sounds/winner.mp3')
  obj.volume = 1.0
  return obj
}

// losing sound
export function losing() {
  const obj = sound('/sounds/losing.mp3')
  obj.volume = 1.0
  return obj
}

// success sound
export function success() {
  const obj = sound('/sounds/success.mp3')
  obj.volume = 1.0
  return obj
}

// warning sound
export function warning() {
  const obj = sound('/sounds/warning.mp3')
  obj.volume = 1.0
  return obj
}

// clicking sound
export function clicking() {
  const obj = sound('/sounds/clicking.mp3')
  obj.volume = 1.0
  return obj
}

// spinning sound
export function spinning() {
  const obj = sound('/sounds/spinning.mp3')
  obj.volume = 1.0
  return obj
}

// background music
export function background() {
  const obj = sound('/sounds/background.mp3')
  obj.loop = true
  obj.autoplay = true
  obj.volume = 0.2
  return obj
}

// export functions
export default {
  losing,
  winning,
  warning,
  success,
  clicking,
  spinning,
  background,
}
