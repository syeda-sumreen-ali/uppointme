import React from 'react'
import  MainStackNavigator from './src/navigation/MainStackNavigator'
import {store} from './src/store/store'
import {Provider} from 'react-redux'
import {LogBox}from 'react-native'


const App = () => {
  LogBox.ignoreAllLogs()

  return (
    <Provider store={store}>
        <MainStackNavigator/>
    </Provider>
  )
}

export default App
