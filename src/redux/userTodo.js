import * as axios from "axios";
import firebase from "firebase";
const SET_USER_ID = 'SET_USER_ID';
const SET_USER_EMAIL = 'SET_USER_EMAIL';
const SET_TASK = 'SET_TASK';

const initialState = {
    userId: '',
    userEmail: '',
    task: [],
}

const userTodo = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_ID :{
            return {
                ...state, userId: action.userId
            }
        }
        case SET_USER_EMAIL :{
            return {
                ...state, userEmail: action.userEmail
            }
        }
        case SET_TASK :{
            return {
                ...state, task: action.task
            }
        }
        default : {
            return state;
        }
    }
}
export const setUserId = (userId) => {
    return {type: SET_USER_ID, userId}
}
export const setUserEmail = (userEmail) => {
    return {type: SET_USER_EMAIL, userEmail}
}
export const initialRequest = (data) => {
    console.log(data);
}
const setTask = (task) => {
    return {type: SET_TASK, task}
}
export const initializationDataBase = (userId) => {
    return dispatch => {
        // const db = firebase.database();
        // db.ref(userId).push([]);
        const db = firebase.database();
        const data = db.ref(userId);
        data.on('value', (elem)=>{
            // console.log(elem.val());
            if (elem.val() === null){
                dispatch(setTask([]));
            } else {
                dispatch(setTask(elem.val()));
            }
        });
        // let data = JSON.parse(name);
    }
}
export const addNewTask = (userId, data) => {
    return dispatch => {
        const db = firebase.database();
        // db.ref(userId).remove();
        db.ref(userId).push(data);
        // console.log(value);
    }
}
export const deleteTaskThunk = (id, userId) => {
    return dispatch => {
        const db = firebase.database();
        db.ref(userId).child(id).remove();
        // const newTasks = Object.values(oldtasks).filter(item=> item.data !== id);
        // db.ref(userId).push(newTasks);
        // const data = db.ref(userId);
        // data.on('value', elem=>{
        //     dispatch(setTask(elem.val()));
        // })
        // dispatch(setTask(e);
        // console.log(newTasks);
    }
}
export default userTodo;