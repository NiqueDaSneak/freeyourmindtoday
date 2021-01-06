const Animations = {
  slide: (active) => {
    const slideUp = {
      0: {
        bottom: '-100%',
      },
      1: {
        bottom: '0%',
      },
    }
    const slideDown = {
      0: {
        bottom: '0%',
      },
      1: {
        bottom: '-100%',
      },
    }
    return active ? slideUp : slideDown
  },
}

export default Animations