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
import SharedConsiderationCreation from './SharedConsiderationCreation'
import ConsiderationDetails from './ConsiderationDetails'

const ModalConductor = () => {

  const [state, dispatch] = useContext(ModalContext)
  const {modalType} = state

  const closeModal = () => {
    dispatch({type: 'CLOSE'})
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
        visible={modalType === 'CHOOSE_TYPE'}
      />
      <PhoneVerification visible={modalType === 'GET_PHONE'} />
      <SharedConsiderationCreation
        close={() => closeModal()}
        visible={modalType === 'CREATE_SHARED'} />
      <ConsiderationDetails
        visible={modalType === 'CONSIDERATION_DETAILS'}
        close={() => closeModal()}
        
      />
    </>
  )
}

export default ModalConductor