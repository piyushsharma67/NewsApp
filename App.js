import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {View,Text} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Screens from './src/Navigation/Stack_Naviagtor'
import { Provider } from 'react-redux'
import {store} from './src/Redux/store'

function App() {
  return (  
    <Provider store={store}>
      <NavigationContainer>       
        <Screens>
        </Screens>
      </NavigationContainer> 
    </Provider>
      
  )
}

export default App;

