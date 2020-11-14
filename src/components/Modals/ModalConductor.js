import React, { useContext } from 'react'
// import { useModal } from '../../hooks/modal.hook'
import AddNewAspect from './AddNewAspect'
import AspectDetails from './AspectDetails'
import { ModalContext } from '../../state'
import CreateShortTermConsideration from './CreateShortTermConsideration'
import CreateLongTermConsideration from './CreateLongTermConsideration'
import AuthModal from './AuthModal'
import { AuthContext } from '../../state'

const ModalConductor = () => {

  const [state, dispatch] = useContext(ModalContext)
  const { modalVisible, modalType } = state

  const [authState, authDispatch] = useContext(AuthContext)
  const { isAuthenticated } = authState

  return(
    <>
      <AuthModal visible={isAuthenticated !== true} />
      <AddNewAspect visible={modalType === 'ADD_NEW_ASPECT'} />
      <AspectDetails visible={modalType === 'GET_ASPECT_DETAILS'} />
      <CreateShortTermConsideration visible={modalType === 'ADD_SHORT_CONSIDERATION'} />
      <CreateLongTermConsideration visible={modalType === 'ADD_LONG_CONSIDERATION'} />
    </>
  )
}

export default ModalConductor