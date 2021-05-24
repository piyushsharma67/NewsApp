import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ArticlesReducer,SelectedArticlesReducer} from './reducer';

const rootReducer = combineReducers({
    ArticlesReducer,
    SelectedArticlesReducer    
});

export const store=createStore(rootReducer,applyMiddleware(thunk))


 