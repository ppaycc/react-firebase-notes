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
        const db = firebase.database();
        const data = db.ref(userId);
        data.on('value', (elem)=>{
            if (elem.val() === null){
                dispatch(setTask([]));
            } else {
                dispatch(setTask(elem.val()));
            }
        });
    }
}
export const addNewTask = (userId, data) => {
    return dispatch => {
        const db = firebase.database();
        db.ref(userId).push(data);
    }
}
export const deleteTaskThunk = (id, userId) => {
    return dispatch => {
        const db = firebase.database();
        db.ref(userId).child(id).remove();
    }
}
export default userTodo;