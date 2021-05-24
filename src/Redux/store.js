// **********Required Redux Packages are Imported********

import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ArticlesReducer,SelectedArticlesReducer} from './reducer';

// *********combing the reducers to be used by Redux-Store********

const rootReducer = combineReducers({
    ArticlesReducer,
    SelectedArticlesReducer    
});

// *********applying middleware thunk so as to do aysnc activities inside the action file of redux*******

export const store=createStore(rootReducer,applyMiddleware(thunk))


 