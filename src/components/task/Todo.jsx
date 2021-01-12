const Todo = ({header, body, date, deleteTask, id}) => {

    const setTimeAgo = (date) =>{
        let d = new Date();
        let d2 = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()).getTime()
        const time = (d2-date)/1000;
        if(time/60<=60){
            console.log(time/60<=60);
            return `${Math.floor(time/60)} minutes ago`;
        } else if (time/60/60 <= 24) {
            console.log(time/60/60 <= 24);
            return `${Math.floor(time/60/60)} hours ago`;
        } else if(time/60/60/24 >= 1) {
            return `${Math.floor(time/60/60/24)} days ago`;
        }
    }

    return (
        <div className='todo'>
            <p className='headerTodo'>{header} <span className='timeAgo'> {setTimeAgo(date)}</span></p>
            <p className='body'>{body}</p>
            <button onClick={()=> deleteTask(id)}>Delete task</button>
        </div>
    )
}

export default Todo;

