import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";
import fire from "../../fire";
import {deleteTaskThunk, initializationDataBase, setUserId} from "../../redux/userTodo";
import {useEffect, useState} from "react";
import firebase from "firebase";
import Todo from "./Todo";
import Form from "./Form";

const Task = () => {
    const userId = useSelector(state=>state.data.userId);
    const userEmail = useSelector(state=>state.data.userEmail);
    const [showForm, setShowForm] = useState(false);
    const dispatch = useDispatch();
    const task = useSelector(state=>state.data.task);
    // console.log(task);
    // console.log(userId);
    const handleLogout = () => {
        fire.auth().signOut();
        dispatch(setUserId(''));
    };
    // const arrTasks = [];
    useEffect(()=>{
        console.log(userId);
        if (userId){
            dispatch(initializationDataBase(userId));
        }
        // if(task){
        //     // const arr =[];
        //     for (let i in task){
        //         const copy = {...task};
        //         // console.log(copy);
        //         arrTasks.push({...copy[i], id:i})
        //         // console.log(i);
        //         // console.log(task);
        //         // console.log(task[i]);
        //     }
        //     console.log(arrTasks);
            // console.log(Object.values(task))
        // }
    }, [userId, dispatch]);
    // const arrTasks = [];
    const forTask = (arr) =>{
        const arrTasks = [];
        if(arr){
            for (let i in arr){
                const copy = {...arr};
                arrTasks.push({...copy[i], id:i})
            }
            console.log(arrTasks);

        }
        return arrTasks;
    };
    // useEffect(()=>{
    //     forTask(task);
    // }, [task])
    // console.log(arrTasks);

    const deleteTask = (id) => {
        dispatch(deleteTaskThunk(id, userId, task));
    }
    return (
        userId ? (
                <section className='hero'>
                    <nav > <h2>{userEmail} {userId}</h2>
                        <button onClick={()=>setShowForm(true)}>Add task</button>
                        <button onClick={handleLogout}>Logout</button></nav>
                    {showForm && <Form setShowForm={setShowForm} userId={userId}/>}
                    <div className='task'>
                        <h2 className='header'>Tasks</h2>
                        {Object.keys(task).length>0 ? forTask(task).map(item=>{
                            return <Todo header={item.header}
                                         deleteTask={deleteTask}
                                         id={item.id}
                                         body={item.title}
                                         date={item.date}
                            />

                        }) : <span className='empty'>You don't have notes</span>
                        }
                    </div>
                </section>
            ) : (<Redirect to='/auth'/>)

    )
}

export default Task;