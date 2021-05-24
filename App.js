// ---------importing the packages-------

import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Screens from './src/Navigation/Stack_Naviagtor'              
import { Provider } from 'react-redux'
import {store} from './src/Redux/store'

// In the App function wrapping the navigation container Inside the Redux Store

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

