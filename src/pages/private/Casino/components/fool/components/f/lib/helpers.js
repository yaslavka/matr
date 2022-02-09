const toRadian = (angle) => (angle * Math.PI) / 180

export const findRightTriangleSides = (angle, hypotenuse) => {
  return {
    x: Math.cos(toRadian(angle)) * hypotenuse,
    y: Math.sin(toRadian(angle)) * hypotenuse,
  }
}

export const getDeepCopy = (obj) => {
  const isArray = obj instanceof Array
  const isObj = typeof obj === 'object' && !isArray
  if (!isArray && !isObj) return obj
  if (isArray) {
    const newArray = []
    for (const [i, elem] of obj.entries()) {
      newArray[i] = getDeepCopy(elem)
    }
    return newArray
  }
  // It is object
  const newObj = {}
  for (const prop in obj) {
    newObj[prop] = getDeepCopy(obj[prop])
  }
  return newObj
}

export const getFieldProps = (viewport) => {
  const svg = {
    ...viewport,
    aspectRatio: viewport.width / viewport.height,
  }

  const field = {
    width: 700,
    height: 600,
    playerSpace: 150,
    aspectRatio: 700 / 600,
  }

  if (svg.aspectRatio > field.aspectRatio) {
    field.scale = svg.height / field.height
    field.x = (svg.width - field.width * field.scale) / 2
    field.y = 0
  } else {
    field.scale = svg.width / field.width
    field.x = 0
    field.y = (svg.height - field.height * field.scale) / 2
  }

  field.style = {
    transform: `translate(${field.x}px, ${field.y}px) scale(${field.scale})`,
  }

  return field
}
