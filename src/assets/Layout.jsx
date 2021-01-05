import React, { useContext } from 'react'
import { View } from 'react-native'
import Footer from '../components/Footer'
import ModalConductor from '../components/Modals/ModalConductor'
import { ThemeContext } from '../state'
import { theme } from './utils'
// import { useModal } from '../hooks/modal.hook'

const Layout =  ({ children }) => {
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  // const  { modalActive, openModal, modalType, closeModal } = useModal()
  return(
    <View style={{
      backgroundColor: theme.layout.scheme[colorScheme].background,
    }}>
      {children}
      {/* <Footer modalActive={modalActive} openModal={openModal} /> */}
    </View>
  )
}

export default Layout