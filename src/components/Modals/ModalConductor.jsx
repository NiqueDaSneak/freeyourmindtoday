import React, { useContext } from 'react'
// import { useModal } from '../../hooks/modal.hook'
import AddNewAspect from './AddNewAspect'
import AspectDetails from './AspectDetails'
import { ModalContext, AuthContext } from '../../state'
import CreateShortTermConsideration from './CreateShortTermConsideration'
import CreateLongTermConsideration from './CreateLongTermConsideration'
import AuthModal from './AuthModal'
import ExplainerModal from './ExplainerModal'
import ArchiveModal from './ArchiveModal'
import ConsiderationChooser from './ConsiderationChooser'

const ModalConductor = () => {

  const [state, dispatch] = useContext(ModalContext)
  const { modalVisible, modalType } = state

  const [authState, authDispatch] = useContext(AuthContext)
  const { isAuthenticated } = authState

  const closeModal = () => {
    dispatch({type: 'CLOSE_MODAL'})
  }
  return(
    <>
      <AuthModal
        visible={isAuthenticated !== true} 
        close={() => closeModal()} />
      <AddNewAspect
        visible={modalType === 'ADD_NEW_ASPECT'} 
        close={() => closeModal()} />
      <AspectDetails
        visible={modalType === 'GET_ASPECT_DETAILS'} 
        close={() => closeModal()} />
      <CreateShortTermConsideration
        visible={modalType === 'ADD_SHORT_CONSIDERATION'} 
        close={() => closeModal()} />
      <CreateLongTermConsideration
        visible={modalType === 'ADD_LONG_CONSIDERATION'} 
        close={() => closeModal()} />
      <ExplainerModal
        visible={modalType === 'SHOW_EXPLAINER'} 
        close={() => closeModal()} />
      <ArchiveModal
        visible={modalType === 'ARCHIVE'}
        close={() => closeModal()} />
      <ConsiderationChooser 
                // visible={true}
        visible={modalType === 'CHOOSE_CONSIDERATION_TYPE'}
      />
    </>
  )
}

export default ModalConductor