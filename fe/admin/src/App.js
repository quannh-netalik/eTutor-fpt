import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layouts/Header';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Faculty from './pages/Faculty';
import Term from './pages/Term';
import FacultyDetail from './pages/Faculty/FacultyDetail';
import TermDetail from './pages/Term/TermDetail';
import User from './pages/User';
import UserDetail from './pages/User/UserDetail';

const App = () => {
    return (
        <Router>
            <Header />
            <Route path="/login" exact component={Login} />
            <PrivateRoute path="/faculty" exact component={Faculty} />
            <PrivateRoute path="/faculty/detail/:id" exact component={FacultyDetail} />
            <PrivateRoute path="/term" exact component={Term} />
            <PrivateRoute path="/term/detail/:id" exact component={TermDetail} />
            <PrivateRoute path="/user" exact component={User} />
            <PrivateRoute path="/user/detail/:id" exact component={UserDetail} />
        </Router>
    );
};

export default App;
