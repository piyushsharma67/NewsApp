//*********importing the Required PAckages

import React,{useEffect} from 'react'
import {Text,View,ScrollView, FlatList,TouchableOpacity,ActivityIndicator} from 'react-native'
import {Card} from 'react-native-elements'
import {newsArticles,setSelectedArticleInfo} from '../Redux/actions'
import {connect} from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen=({data,dispatch,navigation,isSelected,isLoaded})=>{


    // **********whenever the Screen is focussed news articles should be fetched the following hook is used
    useFocusEffect(
        React.useCallback(() => {
            dispatch(newsArticles())    
        }, [])
    );
     //*******whenver user taps on a article following hook will take the user to Details Screen   
    useEffect(()=>{
        if (isSelected==true){
            navigation.navigate("Details")
        }       
    },[isSelected])


    //********Following functiion is used by Flatlist to render articles 
    const renderItem = ({ item }) => (  
        <TouchableOpacity onPress={()=>{
            dispatch(setSelectedArticleInfo(item))
        }}>      
        <Card>
            <Card.Image source={{uri:item.urlToImage}}/>       
            <Text style={{marginVertical:10,alignSelf:'center'}}>{item.description}</Text>
        </Card> 
        </TouchableOpacity>      
    );
      
    if (isLoaded==false){
        return (
            <View style={{flex:1,justifyContent:'center',alignSelf:'center'}}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }else{
        return (   
            <View>
                <FlatList 
                data={data}
                renderItem={renderItem}                                         //******articles are rendered inside the flatlist******
                keyExtractor={(item)=>item.description}
                showsVerticalScrollIndicator={false}/>
            </View>   
        )
    }
}

// *********Mapping props received by the component to the state from the Redux Store

const mapStateToProps = (state,props) => {   
    return { data:state.ArticlesReducer.data,isSelected:state.SelectedArticlesReducer.isSelected,isLoaded:state.ArticlesReducer.isLoaded}
}

// ********Connecting component to the Store

export default connect(mapStateToProps)(HomeScreen);
