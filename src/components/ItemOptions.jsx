import React, {useContext} from 'react'
import {View} from 'react-native'
import  {ThemeContext} from '../state'
import ArchiveToggle from './ArchiveToggle'
import CreatorCard from './CreatorCard'
import {
  theme 
} from '../assets/utils'

const ItemOptions = ({creatorOnPress, archiveTotal, archiveCompleted}) => {
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  return (
    <View style={{
      width: 100,
      maxHeight: 290,
      bottom: 0,
      marginRight: 20,
      borderColor: theme.layout.scheme[colorScheme].black,
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <CreatorCard
        onPress={creatorOnPress} />
      <ArchiveToggle
        total={archiveTotal}
        completed={archiveCompleted} />
  
    </View>
  )
}



export default ItemOptions