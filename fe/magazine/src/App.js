import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './components/layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import BlogDetail from './pages/BlogDetail';
import Faculty from './pages/Faculty';
import CreateBlog from './pages/BlogDetail/CreateBlog/CreateBlog';
import EditBlog from './pages/BlogDetail/EditBlog/EditBlog';
import Chat from './pages/Chat';

const App = () => {
    return (
        <Router>
            <MainLayout>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <PrivateRoute path="/profile/:id" exact component={Profile} />
                    <PrivateRoute path="/" exact component={Dashboard} />
                    <PrivateRoute path="/faculty" exact component={Faculty} />
                    <PrivateRoute path="/chat" exact component={Chat} />
                    <PrivateRoute path="/blog/create" role="student" exact component={CreateBlog} />
                    <PrivateRoute path="/blog/:id" component={BlogDetail} />
                    <PrivateRoute path="/blog-edit/:id/" exact component={EditBlog} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </MainLayout>
        </Router>
    );
};

export default App;
