import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";

class Navbar extends Component {
    render() {
        const {user}= this.props;
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <Link className="navbar-brand" to="/">Home</Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">

                        <NavLink className="nav-item nav-link" to="/info">Server Info</NavLink>

                        <NavLink className="nav-item nav-link" to="/rank">PvP Rank</NavLink>

                        <NavLink className="nav-item nav-link" to="/web-mall">Web Mall</NavLink>

                        {   !user &&
                        <React.Fragment>
                            <NavLink className="nav-item nav-link" to="/login">Login</NavLink>

                            <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
                        </React.Fragment>
                        }

                        {   user &&
                        <React.Fragment>
                            <NavLink className="nav-item nav-link" to="/profile">{user.sub}</NavLink>

                            <NavLink className="nav-item nav-link" to="/logout">logout</NavLink>
                        </React.Fragment>
                        }
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;