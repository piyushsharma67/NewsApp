import React from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen'
import DetailScreen from '../Screens/DetailScreen'

const Stack=createStackNavigator()

const Screens=({route})=>{
   return (
    <Stack.Navigator 
        screenOptions={{
            headerTitleAlign:'center',
        }}>         
        <Stack.Screen name="Home" component={HomeScreen} options={{ title:'News' }}/>  
        <Stack.Screen name="Details" component={DetailScreen} options={{ title:'News'}}/> 
    </Stack.Navigator>
   )
}

export default Screens