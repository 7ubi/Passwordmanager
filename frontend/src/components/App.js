import React from "react";
import { render} from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from './login/Login';
import Signup from "./login/Signup";
import PasswordStorage from "./passwordmanager/PasswordStorage";


function App(){
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={ <PasswordStorage />} />
                <Route path="/login" element={ <Login /> } />
                <Route path="/signup" element={ <Signup /> } />
            </Routes>
        </Router>
    );
}

export default App;

const appDiv = document.getElementById('app');
render(<App />, appDiv);