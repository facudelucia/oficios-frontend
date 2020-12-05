import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Footer from './Footer';
import FormEditOficio from './FormEditOficio';
import FormEditUserChanga from './FormEditUserChanga';
import Home from './Home';
import Login from './Login';
import Navbar from './Navbar';
import PrivateRoute from './PrivateRoute';
import RegisterScreen from './RegisterScreen';
import { useStateValue } from './StateProvider';
function App() {
    const [{token}, dispatch] = useStateValue()
    return (
        <Router>
            <Switch>
                <Route exact path={"/"}>
                    <Navbar />
                    <Home />
                    <Footer />
                </Route>
                <Route exact path={"/register"}>
                    <RegisterScreen />
                    <Footer />
                </Route>
                <Route exact path={"/login"}>
                    <Login />
                    <Footer />
                </Route>
                <PrivateRoute exact path={"/edituseroficio"} component={FormEditOficio} isAuth={token}/>
                <PrivateRoute exact path={"/edituserchanga"} isAuth={token}component={FormEditUserChanga}/>
            </Switch>
        </Router>
    )
}

export default App
