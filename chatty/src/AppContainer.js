import { useEffect, useState } from 'react'

import firebase from 'firebase'

import { AppPresentation } from './AppPresentation'

function AppContainer() {
  const [counter, setCounter] = useState(0)
  const [db, setDb] = useState()

  useEffect(() => {
    const firebaseConfigs = {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      storageBucket: ''
    }
    firebase.initializeApp(firebaseConfigs)
    const database = firebase.storage()
    setDb(database)

    const counterRef = firebase.database().ref('counter')
    counterRef.on('value', (snapshot) => {
      const data = snapshot.val()
      setCounter(data.counter)
    })
  }, [])

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
