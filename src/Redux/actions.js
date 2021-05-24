import { Alert} from 'react-native';
import axios from 'axios';

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

    return (dispatch) => {  // don't forget to use dispatch here!
      return axios_inst.get('/everything',       
       {params:params}
      )
      .then((response) => {
        // console.log("response is",response.status)
        if (response.status==200) { // response success checking logic could differ
        //   console.log("articles are",response.data.articles)
          return dispatch(setData(response.data.articles))       
        } else {
          Alert.alert('error', 'error occured');
        }
      })
      .catch((err) => {
        console.log("err in getting data",err)
        // return dispatch(setError(err.response.data.message));
      });
    };
};

export const setSelectedArticleInfo=(Article)=>{
    return (dispatch)=>{
        // console.log("selected is",Article)
        dispatch(setSelectedArticle(Article))
    }
}

   
    //     const requestHandler = request => {
    //     //  console.log("request is",request)
        
    //       return request;
    //   };
      
    //   axios_inst.interceptors.request.use(
    //     (request) => requestHandler(request),
        
    //   );