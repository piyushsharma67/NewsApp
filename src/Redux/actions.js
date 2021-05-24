import { Alert} from 'react-native';
import axios from 'axios';
import { NewsArticlesInitialState } from './initialState';



const setData=(data)=>{                   
    return {
        type:"SET_ARTICLES_DATA",
        payload:data 
    }
}
const setSelectedArticle=(Article)=>{
    return {
        type:"SET_ARTICLES",
        payload:Article
    }
}

// *************Function to fetch the Articles from the news.org server *****************

export const newsArticles = () => {   
   
    const params={
        'apiKey':'5abf594baf42470fa4a09e6657f5bea6',
        'sources':'abc-news',
        'sortBy':'popularity',
        'from':'2021-05-22',
        'pageSize':20
    }

    var axios_inst = axios.create({
        baseURL: 'https://newsapi.org/v2',      
          timeout: 1000,
          headers: {'X-Custom-Header': 'foobar', "Content-Type": "application/json"}
        });   

    return (dispatch) => {  
      return axios_inst.get('/everything',       
       {params:params}
      )
      .then((response) => {        
        if (response.status==200) {       
          return dispatch(setData(response.data.articles))       
        } else {
          Alert.alert('error', 'error occured');
        }
      })
      .catch((err) => {
        console.log("err in getting data",err)       
      });
    };
};

// ************Function to store the selected article info inside the states***************8

export const setSelectedArticleInfo=(Article)=>{
    return (dispatch)=>{
        // console.log("selected is",Article)
        dispatch(setSelectedArticle(Article))
    }
}
