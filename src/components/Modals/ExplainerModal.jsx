import React from 'react'
import { Modal } from 'react-native'
import { BlurView } from 'expo-blur'
import Carousel from '../Carousel/index.tsx'

const ExplainerModal = ({ visible, close }) => (
    <Modal
      animationType='fade'
      transparent
      visible={visible}
    >
      <BlurView tint='dark' intensity={100}  style={{
        height: '100%',
      }}>
        <Carousel 
          // eslint-disable-next-line react/style-prop-object
          style='slide'
          items={[{
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare laoreet elit, sed dapibus arcu eleifend a. Nulla ac mi vel lacus pharetra molestie sed nec augue. Donec in dui ut velit viverra dictum. Etiam lorem nibh, suscipit eu gravida a, auctor non ipsum. Nullam quis nisi odio. Cras eros felis, consequat in magna nec, porta feugiat diam. Donec accumsan nisl non libero finibus, non faucibus risus ultricies. Ut posuere, urna malesuada ultrices malesuada, urna mauris tempor orci, id aliquet urna orci id tortor. Praesent sit amet est eget sapien suscipit maximus. Phasellus condimentum tristique est, sit amet aliquam libero finibus vitae.',
          }, {
            title: 'Fusce at porta ligula, in pharetra nisl. Pellentesque eu arcu sed risus fringilla cursus. Phasellus ultricies urna justo, ut viverra risus euismod in. Cras at nunc interdum, cursus nibh in, blandit leo. Quisque at fringilla justo. Mauris hendrerit, ipsum ac aliquet aliquam, dolor massa varius lacus, fringilla tristique massa eros nec felis. Mauris hendrerit velit elit, vel pharetra massa pharetra non. Integer viverra libero sem, eu tempor ligula ultricies sed. Vestibulum nec mi id lacus molestie gravida sit amet blandit dolor.',
          }, {
            title: 'About feature Y.',
          }]}

        />
      </BlurView>
    </Modal>
  )

export default ExplainerModal