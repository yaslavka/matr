const prevChips = Number(localStorage.getItem('chips'))
const prevChipsInWishingWell = Number(localStorage.getItem('chipsInWishingWell'))

const initState = {
  chips: prevChips ? prevChips : 2000,
  chipsInWishingWell: prevChipsInWishingWell && prevChips ? prevChipsInWishingWell : 0,
}

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADJUST_CHIPS': {
      var newChips = state.chips + Number(action.amount)
      localStorage.setItem('chips', newChips)
      return {
        ...state,
        chips: newChips,
      }
    }
    case 'ADJUST_CHIPS_WELL': {
      var newChipsInWishingWell = state.chipsInWishingWell + action.amount
      localStorage.setItem('chipsInWishingWell', newChipsInWishingWell)
      return {
        ...state,
        chipsInWishingWell: newChipsInWishingWell,
      }
    }
    default: {
      return state
    }
  }
}

export const mapStateToProps = (state) => {
  return {
    chips: state.chips,
    chipsInWishingWell: state.chipsInWishingWell,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    adjustChips: (amount) => {
      dispatch({ type: 'ADJUST_CHIPS', amount: amount })
    },
    adjustChipsInWishingWell: (amount) => {
      dispatch({ type: 'ADJUST_CHIPS_WELL', amount: amount })
    },
  }
}

export default reducer
