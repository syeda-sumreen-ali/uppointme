import React from 'react'
import  MainStackNavigator from './src/navigation/MainStackNavigator'



const App = () => {
  return (
    <Provider store={store}>
      <MainStackNavigator/>
    </Provider>
  )
}

export default App
