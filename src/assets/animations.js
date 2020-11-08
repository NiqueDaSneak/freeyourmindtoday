const Animations = {
  slide: (active) => {
    let slideUp = {
      0: {
        bottom: '-100%',
        // opacity: '0'
        
      },
      1: {
        bottom: '0%',
        // opacity: '1'
  
      },
    }
    let slideDown = {
      0: {
        bottom: '0%',
        // opacity: '1'
      },
      1: {
        bottom: '-100%',
        // opacity: '0'
      },
    }
    active ? slideUp : slideDown
  },
}

export default Animations