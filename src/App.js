import React, { createContext, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Register from './Components/Register/Register';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Event from './Components/Event/Event';
import Admin from './Components/Admin/Admin';
import AddEvent from './Components/AddEvent/AddEvent';


export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <p>Name: {loggedInUser.name}</p>
        <Router>
          <Switch>
            <Route path='/home'>
              <Home></Home>
            </Route>
            <Route path='/admin'>
            <Admin></Admin>
            </Route>
            <Route path='/addEvent'>
              <AddEvent></AddEvent>
            </Route>
            <Route path='/login'>
            <Login></Login>
            </Route>
            <PrivateRoute path='/:id/register'>
              <Register></Register>
            </PrivateRoute>
            <Route path='/event'>
              <Event></Event>
            </Route>
            <Route path='/'>
            <Home></Home>
            </Route>
            
          </Switch>
        </Router>
        
    </UserContext.Provider>
  );
}

export default App;
