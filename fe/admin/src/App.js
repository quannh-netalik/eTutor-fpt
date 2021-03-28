import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Faculty from './pages/Faculty';
import Term from './pages/Term';
import FacultyDetail from './pages/Faculty/FacultyDetail';
import TermDetail from './pages/Term/TermDetail';
import User from './pages/User';
import UserDetail from './pages/User/UserDetail';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';

const App = () => {
    return (
        <Router>
            <MainLayout>
                <Switch>

                    <Route path="/login" exact component={Login} />
                    <PrivateRoute path="/" exact role="admin" component={Dashboard} />
                    <PrivateRoute path="/faculty" exact role="admin" component={Faculty} />
                    <PrivateRoute path="/faculty/detail/:id" exact role="admin" component={FacultyDetail} />
                    <PrivateRoute path="/term" exact role="admin" component={Term} />
                    <PrivateRoute path="/term/detail/:id" exact role="admin" component={TermDetail} />
                    <PrivateRoute path="/user" exact role="admin" component={User} />
                    <PrivateRoute path="/user/detail/:id" exact role="admin" component={UserDetail} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </MainLayout>
        </Router>
    );
};

export default App;
