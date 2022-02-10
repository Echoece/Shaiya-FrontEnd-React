import {Component, Fragment} from "react";
import {getCurrentUser} from "../service/auth/authService";
import {ToastContainer} from "react-toastify";
import {Switch} from "react-router";
import {Redirect, Route} from "react-router-dom";

import Home from "./home/home";
import Navbar from "./navbar/navbar";
import ProtectedRoute from "./util/protectedRoute";
import RegisterForm from "./auth/registerForm";
import Logout from "./auth/logout";
import LoginForm from "./auth/loginForm";
import NotFound from "./util/notFound";
import RankPage from "./rank/rankPage";
import Shop from "./shop/shop";
import Profile from "./profile/profile";
import Info from "./info/info";
import PlayerDetail from "./rank/playerDetails/playerDetail";
import Download from "./download/download";

import {getRankData} from "../service/rank/rankService";

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./footer/footer";


class App extends Component {
    state = {
        user: '',
        allPlayer:[]
    }

    async componentDidMount() {
        // apparently for each individual calls, must set state individually, otherwise if one async call gets a error
        // other calls dont get executed as well. That is why i initialized the states in the respective component.
        const user = getCurrentUser();
        this.setState({user});

        const {data} = await getRankData();
        this.setState({allPlayer: data});
    }

    render() {
        console.log(this.props.history)
        return (
            <Fragment>
                <div className="App">
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
                            render={props => <Profile {...props} user={this.state.user}/>}
                        />
                        <Route
                            path="/rank/:id"
                            component={PlayerDetail}
                        />
                        <Route
                            path="/rank"
                            render={props => <RankPage {...props} data={this.state.allPlayer}/>}
                        />
                        <Route path="/not-found" component={NotFound}/>
                        <Route path="/download" component={Download}/>
                        <Route path="/" exact
                               render={props => <Home {...props} user={this.state.user}/>}
                        />
                        <Redirect to="/not-found"/>
                    </Switch>
                    <Footer/>
                </div>

            </Fragment>
        )
    }
}

export default App;
