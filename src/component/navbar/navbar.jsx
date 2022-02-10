import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";
import './navbar.css';

class Navbar extends Component {
    render() {
        const {user} = this.props;

        return (
            <div className="nav_wrapper">

                <Link className="nav_link" to="/">Home</Link>

                <div className="nav_links">

                    <NavLink className="nav_link" to="/info">Info</NavLink>

                    <NavLink className="nav_link" to="/rank">Ranking</NavLink>

                    <NavLink className="nav_link" to="/download">Download</NavLink>

                    <NavLink className="nav_link" to="/web-mall">Web Mall</NavLink>

                </div>

                <div className="nav_links">
                    {!user &&
                    <React.Fragment>

                        <NavLink className="nav_link" to="/login">Login</NavLink>

                        <NavLink className="nav_link" to="/register">Register</NavLink>

                    </React.Fragment>
                    }

                    {user &&
                    <React.Fragment>

                        <NavLink className="nav_link" to="/profile">
                            {user.sub.charAt(0).toUpperCase() + user.sub.slice(1)}
                        </NavLink>

                        <NavLink className="nav_link" to="/logout">Logout</NavLink>

                    </React.Fragment>
                    }
                </div>
            </div>
        );
    }
}

export default Navbar;