import React, { useContext } from 'react'
import AddNewAspect from './AddNewAspect'
import AspectDetails from './AspectDetails'
import {ModalContext} from '../../state'
import CreateShortTermConsideration from './CreateShortTermConsideration'
import CreateLongTermConsideration from './CreateLongTermConsideration'
import ExplainerModal from './ExplainerModal'
import ArchiveModal from './ArchiveModal'
import ConsiderationChooser from './ConsiderationChooser'
import PhoneVerification from './PhoneVerification'

const ModalConductor = () => {

  const [state, dispatch] = useContext(ModalContext)
  const {modalType} = state

  const closeModal = () => {
    dispatch({type: 'CLOSE_MODAL'})
  }
  return(
    <>
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
        visible={modalType === 'CHOOSE_CONSIDERATION_TYPE'}
      />
      <PhoneVerification visible={modalType === 'GET_PHONE'} />
    </>
  )
}

export default ModalConductor