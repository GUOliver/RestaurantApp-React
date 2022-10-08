import React from 'react'
import { useEffect, useState } from 'react'

import Card from './components/Card'
import AddPlaceModal from './components/AddPlaceModal'

import logo from './assets/logo512.png'
import plusIcon from './assets/plus.svg'
import placesInfo from './assets/data.json'

import './styles/App.css'
import './styles/Card.css'

// let's add some basic JSX to our App component.
const App = () => {

  // Calling the useState function returns two things: 
  // a state value and a function that can be used to change this state value
  // while our app is running. It uses JavaScript "destructuring" syntax

  // replace all of our state variables with a single state called place which
  // will store all the info for our restaurant in a single JavaScript Object. 
  // A JavaScript Object is a type of data structure which stores key-value pairs.
  const [places, setPlaces] = useState(placesInfo)

  const [showModal, setShowModal] = useState(false)
  const [allTags, setAllTags] = useState(['Burgers', 'Sashimi', 'Onigiri'])
  const handleUpsertPlace = (placeInfo) => {
    setShowModal(false)
    const newPlaces = [...places]
    if (placeInfo.id) {
      for (let i = 0; i < newPlaces.length; i++) {
        if (newPlaces[i].placeId === placeInfo.placeId) {
          newPlaces[i] = placeInfo
          setPlaces(newPlaces)
          return
        }
      }
    } else {
      placeInfo.placeId = places.length
      setPlaces([...newPlaces, placeInfo])
    }
  }

  const handleRemovePlace = (placeId) => {
    const newPlaces = [...places]
    for (let i = 0; i < newPlaces.length; i++) {
      if (newPlaces[i].placeId === placeId) {
        newPlaces.splice(i, 1)
        break
      }
    }
    setPlaces(newPlaces)
  }

  const handleCreateTag = (newTag) => {
    if (!allTags.includes(newTag)) {
      setAllTags([...allTags, newTag])
    }
  }

  return (
    <>
      <header>
        <nav>Oliver's Food
          <img src={logo} alt="logo" />
          Collections
          <button id="addPlaceBtn" onClick={() => setShowModal(true)}>
            Add Place
            <img
              src={plusIcon}
              alt="Add Place Icon"
              height="16"
              style={{ marginLeft: '0.3rem', marginRight: '-0.3rem' }}
            />
          </button>
        </nav>
      </header>
      <main>
        <h1>Welcome !</h1>
        <p>
          Here is a list of all the restaurants, cafes, dessert bars and other eateries that I want
          to keep a record of either because I like them, dislike them, or would like to find out.
        </p>
        {/* To let our Card component access this state, 
        we pass it as a "property" or "prop" of the Card component. 
        We can name the property anything we like, such as info. */}
        {/* <Card info={place}/> */}

        {/* To display a card for each restaurant in the list, 
        we'll use the JavaScript Array.map method which transforms 
        each object in the array into a <Card /> component. */}
        {places.map((place, i) => <Card key={i} info={place}/>)}
        {/* Remember each component in a list must have a unique 
        key prop, which we use i for. */}

        <AddPlaceModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSubmitPlace={handleUpsertPlace}
          allTags={allTags}
          onCreateTag={handleCreateTag}
        />
      </main>
    </>
  )
}

export default App  // app is a component
