import { useEffect, useState } from 'react'

import firebase from 'firebase'

import { AppPresentation } from './AppPresentation'

function AppContainer() {
  const [counter, setCounter] = useState(0)
  const [db, setDb] = useState()

  useEffect(() => {
    initFirebaseConnection()
    observe('counter', setCounter)
  }, [])

  const initFirebaseConnection = () => {
    const firebaseConfigs = {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      storageBucket: ''
    }
    firebase.initializeApp(firebaseConfigs)
    const database = firebase.storage()
    setDb(database)
  }

  const observe = (keyName, callback) => {
    const counterRef = firebase.database().ref(keyName)
    counterRef.on('value', (snapshot) => {
      const data = snapshot.val()
      callback(data[keyName])
    })
  }

  const addNumber = () => {
    const newCounter = counter + 1
    setCounter(newCounter)

    const counterRef = firebase.database().ref('counter')
    counterRef.set(
      {
        counter: newCounter
      },
      (error) => {
        if (error) {
          console.log('Error', error)
        } else {
          console.log('Update successfully')
        }
      }
    )
  }

  return <AppPresentation addNumber={addNumber} counter={counter} />
}

export default AppContainer
