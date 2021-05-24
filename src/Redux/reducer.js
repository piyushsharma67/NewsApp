import {NewsArticlesInitialState,SelectedNewsArticleInitialState} from './initialState'


export const  ArticlesReducer=(state=NewsArticlesInitialState,actions)=>{
    switch (actions.type){
        case "SET_ARTICLES_DATA":
            return {...state,data:actions.payload,isloaded:true}
        default:
            return {state}
    }
}

export const  SelectedArticlesReducer=(state=SelectedNewsArticleInitialState,actions)=>{
    switch (actions.type){
        case "SET_ARTICLES":
            return {...state,
                author:actions.payload.author,
                content:actions.payload.content,
                description:actions.payload.description,
                publishedAt:actions.payload.publishedAt,
                title:actions.payload.title,
                url:actions.payload.url,
                image:actions.payload.urlToImage,
                isSelected:true
            }
        default:
            return {state}
    }
}