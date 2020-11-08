import React, { useReducer, createContext } from 'react'
import PropTypes from 'prop-types'

export const AspectsContext = createContext()

const initialState = {
  aspects: [
    {
      'title': 'My Home',
      'type': 'long',
      'importanceStatement': 'This is important to me because I live AND work here. I need this place to be comfortable for me and Pea but also allow for a level of focus and creativity.',
    },
    {
      'title': 'Pea',
      'type': 'long',
      'importanceStatement': 'This is important to me because I love this boy and want him to thrive',
    },
    {
      'title': 'Stop watching porn',
      'type': 'short',
      'importanceStatement': 'This is important to me because I want to protect the sanctity of my body and mind, and I want to practice seminal retention.',
      'considerations': [],
    },
    {
      'title': 'Lack of drive for personal projects',
      'type': 'short',
      'importanceStatement': 'This is important',
      'considerations': [],
    },
    {
      'title': 'Financials',
      'type': 'long',
      'importanceStatement': 'this is important to me because I was never taught how to have success in this area, and I can’t squander the opportunity I find myself in to make this wealth permanent for my family. It’s is important to me to also learn how to pass this information, skills and money to those I love.',
    },
    {
      'title': 'Asana Practice',
      'type': 'short',
      'importanceStatement': 'This is important to me because this is something I can give to people, so it needs to be a consistent part of my life. Also the benefits won’t hurt either.',
      'considerations': [],
    },
    {
      'title': 'Developer Career',
      'type': 'long',
      'importanceStatement': 'This is important to me because of the constant mental challenge this brings. Software engineering is a way for me to get the mental test I need, but also bleed into being able to create ideas that I have. this is important to me because there are still so many more opportunities for me to learn and grow as well as benefit financially. Its a part of the bigger picture because this is how I am going to fund the beginning of my real estate empire. It does have an effect on others in the sense that I will be able to provide for my family and many other black peoples with the ways in which I can flip this money I make now.',
    },
    {
      'title': 'Gym Life & Nutrition',
      'type': 'long',
      'importanceStatement': 'This is important to me because I want to stay healthy and not waste the athleticism I have. I also use my body to express the strength and joy I feel, and also push it to the limit as a way to release my own fears and pain.',
    },
  ],
}

const reducer = (state, action) => {
  switch (action.type) {
  case 'ADD_NEW_ASPECT':
    return {
      aspects: [...state.aspects, action.payload]
    }
  default:
    throw new Error()
  }
}

export const AspectsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AspectsContext.Provider value={[state, dispatch]}>
      {children}
    </AspectsContext.Provider>
  )
}

AspectsContextProvider.propTypes = {
  children: PropTypes.any
}