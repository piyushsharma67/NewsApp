import React,{useEffect} from 'react'
import {Text,View,ScrollView, FlatList,TouchableOpacity, ActivityIndicator} from 'react-native'
import {Card} from 'react-native-elements'
import {newsArticles,setSelectedArticleInfo} from '../Redux/actions'
import {connect} from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen=({data,dispatch,navigation,isSelected,isLoaded})=>{

    useFocusEffect(
        React.useCallback(() => {
            dispatch(newsArticles())    
        }, [])
      );

    useEffect(()=>{
        if (isSelected==true){
            navigation.navigate("Details")
        }       
    },[isSelected])

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
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size="large"/>
              </View>
            
        )
          }else{
    return (   
        <View>
            <FlatList 
            data={data}
            renderItem={renderItem}
            keyExtractor={(item)=>item.title}
            showsVerticalScrollIndicator={false}/>
        </View>
   
    )
      }
}

const mapStateToProps = (state,props) => {   
    return { data:state.ArticlesReducer.data,isSelected:state.SelectedArticlesReducer.isSelected,isLoaded:state.ArticlesReducer.isLoaded}
}

export default connect(mapStateToProps)(HomeScreen);
