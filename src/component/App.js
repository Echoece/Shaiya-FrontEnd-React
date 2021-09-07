import './App.css';
import {Component, Fragment} from "react";
import {getCurrentUser} from "../service/authService";
import {ToastContainer} from "react-toastify";
import {Switch} from "react-router";
import Home from "./home/home";
import Navbar from "./navbar/navbar";
import {Redirect, Route} from "react-router-dom";
import ProtectedRoute from "./util/protectedRoute";
import RegisterForm from "./auth/registerForm";
import Logout from "./auth/logout";
import LoginForm from "./auth/loginForm";
import NotFound from "./util/notFound";
import RankPage from "./rank/rankPage";
import Shop from "./shop/shop";
import Profile from "./profile/profile";
import 'react-toastify/dist/ReactToastify.css';
import Info from "./info/info";


class App extends Component{
    state={}

    componentDidMount() {
        const user = getCurrentUser();
        this.setState({user});
    }

    render() {
        return(
            <Fragment>
                <ToastContainer/>
                <Navbar user={this.state.user}/>
                <Switch>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/register" component={RegisterForm}/>
                    <Route path="/info" component={Info}/>
                    <ProtectedRoute
                        path="/web-mall"
                        component={Shop}
                    />
                    <Route
                        path="/profile"
                        render={props=> <Profile {...props} user={this.state.user}/>}
                    />
                    <Route path="/rank" component={RankPage}/>
                    <Route path="/not-found" component={NotFound}/>
                    <Route  path="/" exact
                           render={props=> <Home {...props} user={this.state.user}/>}
                    />
                    <Redirect to="/not-found"/>
                </Switch>
            </Fragment>
        )
    }
}

export default App;
