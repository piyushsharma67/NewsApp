import * as React from 'react'
import {Text,View,Image,Dimensions,StyleSheet,ScrollView,Button,SafeAreaView} from 'react-native'
import {connect} from 'react-redux'
import { Platform } from 'react-native';
import { Icon } from 'react-native-elements'
import moment from 'moment';
import Share from 'react-native-share';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import {PermissionsAndroid} from 'react-native';

const {width,height}=Dimensions.get("screen")
const articleWidth=width*0.9

const DetailedScreen=({image,description,author,publishedAt,content})=>{


    const myCustomeShare=async()=>{
        const shareOptions={
            message:'Enter your Text here'
        }
        try{
            const ShareResponse=await Share.open(shareOptions)
        }catch(error){
            console.log('error',error)
        }
    }

    const checkPermission = async () => {
    
        if (Platform.OS === 'ios') {
          downloadImage()
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission Required',
                message:
                  'App needs access to your storage to download Photos',
              }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {             
              console.log('Storage Permission Granted.')
              downloadImage()
            } else {             
              alert('Storage Permission Not Granted')
            }
          } catch (err) {         
            console.warn(err)
          }
        }
      }

      const downloadImage = () => {

        let date = new Date()
       
        let image_URL = image  
    
        let ext = getExtention(image_URL)
        ext = '.' + ext[0]
       
        const { config, fs } = RNFetchBlob
        let PictureDir = fs.dirs.PictureDir
        let options = {
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path:
              PictureDir +
              '/image_' + 
              Math.floor(date.getTime() + date.getSeconds() / 2) +
              ext,
            description: 'Image',
          },
        };
        config(options)
          .fetch('GET', image_URL)
          .then(res => {
            console.log('res -> ', JSON.stringify(res));
            alert('Image Downloaded Successfully.');
          })
      }
    
      const getExtention = filename => {       
        return /[.]/.exec(filename) ?/[^.]+$/.exec(filename) : undefined;
      }
       
      if(Platform.OS=="ios"){
          return (<SafeAreaView style={{flex:1}}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={style.contentContainer}>
                  {image!=""? <Image style={style.image} source={{uri:image}}/> : null } 
                  <View style={style.saveButton}>
                      <Button title="Save Image" onPress={()=>checkPermission()}/>
                  </View>           
                  <Text style={style.description}>{description}</Text>
                  <View style={style.author_date}>
                      <Text style={{width:articleWidth/3}}>{author}</Text>               
                      <TouchableOpacity onPress={()=>myCustomeShare}>
                          <Icon name="share-social-outline" type='ionicon' size={20} style={{width:articleWidth/6}}/>  
                      </TouchableOpacity>              
                      <Text style={{width:articleWidth/3}}>{moment(publishedAt).format('LL')}</Text>
                  </View>
                  <Text style={style.content}>{content}</Text>
              </ScrollView>
              </SafeAreaView>)
      }else{
          return (
              <View style={{flex:1}}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={style.contentContainer}>
                  {image!=""? <Image style={style.image} source={{uri:image}}/> : null } 
                  <View style={style.saveButton}>
                      <Button title="Save Image" onPress={()=>checkPermission()}/>
                  </View>           
                  <Text style={style.description}>{description}</Text>
                  <View style={style.author_date}>
                      <Text style={{width:articleWidth/3}}>{author}</Text>               
                      <TouchableOpacity onPress={()=>myCustomeShare()}>
                          <Icon name="share-social-outline" type='ionicon' size={20} style={{width:articleWidth/6}}/>  
                      </TouchableOpacity>                  
                      <Text style={{width:articleWidth/3}}>{moment(publishedAt).format('LL')}</Text>
                  </View>
                  <Text style={style.content}>{content}</Text>
              </ScrollView>
              </View>
          )
      }
        
       

}

style=StyleSheet.create({
    contentContainer:{
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    image:{
        width:articleWidth,
        height:height*0.2,
        resizeMode:'cover',
        marginTop:20,
    },
    saveButton:{
        marginTop:10,
        marginBottom:5,
        width:articleWidth/2,
        alignSelf:'center'
    },
    description:{
        marginVertical:10,
        alignSelf:'center',
        width:articleWidth,
        fontFamily:'PatrickHand',
        fontSize:20
    },
    author_date:{
        marginVertical:10,
        width:articleWidth,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    content:{
        fontFamily:'PatrickHand',
        fontSize:16,width:articleWidth
    }
    
})

const mapStateToProps = (state,props) => {   
    return { author:state.SelectedArticlesReducer.author,
    content:state.SelectedArticlesReducer.content,
    description:state.SelectedArticlesReducer.description,
    publishedAt:state.SelectedArticlesReducer.publishedAt,
    title:state.SelectedArticlesReducer.title,
    url:state.SelectedArticlesReducer.url,
    image:state.SelectedArticlesReducer.image
    }
}

export default connect(mapStateToProps)(DetailedScreen)