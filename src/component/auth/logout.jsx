import {Component} from 'react';
import {logout} from "../../service/auth/authService";

class Logout extends Component {

    componentDidMount() {
        logout();
        window.location="/";
    }
    render() {
        return null;
    }
}

export default Logout;