import logo from './logo.svg';
import Login from "./components/auth/Login";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import Task from "./components/task/Task";



function App() {
  return (
      <BrowserRouter>
        <div className="App">
            <Route exact path='/auth' render={()=> <Login/> } />
            <Route exact path='/' render={()=> <Redirect to='/auth'/> } />
            <Route exact path='/task/:status?' render={()=> <Task/> } />
            <Route exact path='/task' render={()=> <Redirect to='/auth/'/>}/>
        </div>
      </BrowserRouter>
  );
}

export default App;
