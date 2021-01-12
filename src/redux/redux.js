import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import userTodo from "./userTodo";

const reducers = combineReducers({
    data: userTodo,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;