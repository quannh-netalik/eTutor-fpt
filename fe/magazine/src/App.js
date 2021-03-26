import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './components/layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import BlogDetail from './pages/BlogDetail';

const App = () => {
    return (
        <Router>
            <MainLayout>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <PrivateRoute path="/" exact component={Dashboard} />
                    <PrivateRoute path="/profile/:id" exact component={Profile} />
                    <PrivateRoute path="/blog/:id" exact component={BlogDetail} />
                    {/* <PrivateRoute path="/faculty/detail/:id" exact component={FacultyDetail} />
                    <PrivateRoute path="/term" exact component={Term} />
                    <PrivateRoute path="/term/detail/:id" exact component={TermDetail} />
                    <PrivateRoute path="/user" exact component={User} />
                    <PrivateRoute path="/user/detail/:id" exact component={UserDetail} />*/}
                    <Route path="*" component={NotFound} />
                </Switch>
            </MainLayout>
        </Router>
    );
};

export default App;
