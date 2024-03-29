import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";




import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import Admin from './sajatosztalyok/Admin'
import Kereses from "./sajatosztalyok/Kereses"
import Proba from './sajatosztalyok/Proba'
import ProbaAdmin from './sajatosztalyok/ProbaAdmin'
import KeresSzoveg from "./sajatosztalyok/KeresSzoveg";
import DiagramFilm from './sajatosztalyok/DiagramFilm'
import Torles from './sajatosztalyok/Torles'
import Csevego from './sajatosztalyok/Csevego'
import Blog from './sajatosztalyok/Blog'
import BlogTorles from './sajatosztalyok/TorlesBlog'
import UjBlog from "./sajatosztalyok/UjBlog";
import NoiEtrend from "./sajatosztalyok/NoiEtrend"
import FerfiEtrend from './sajatosztalyok/FerfiEtrend'




class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (

      <div >
        <Navbar collapseOnSelect expand="lg" bg="#252525" variant="dark" className="navbar-shadow" >

          <Navbar.Collapse id="responsive-navbar-nav" >

            <Nav className="mr-auto"  >
              <div className="topnav-centered">
              <Link to={"/"} className="navbar-brand">
                Záródoga
              </Link>
              </div>

              <div className="navbar-nav mr-auto">
                {/* <li className="nav-item">
                  <Link to={"/Kereses"} className="nav-link">
                    Keresés
                  </Link>
                </li> */}

                {/* <li className="nav-item">
                  <Link to={"/DiagramFilm"} className="nav-link">
                    Diagram
                  </Link>
                </li> */}

                {/* <li className="nav-item">
                  <Link to={"/Proba"} className="nav-link">
                    Próba
                  </Link>
                </li> */}

                <li className="nav-item" >
                  <Link to={"/KeresSzoveg"} className="nav-link">
                    Gyakorlatok
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/Csevego"} className="nav-link">
                    Csevegő
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/Blog"} className="nav-link">
                    Blog
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/NoiEtrend"} className="nav-link">
                    Női Étrend
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/FerfiEtrend"} className="nav-link">
                    Férfi Étrend
                  </Link>
                </li>








                {/* 
                {showModeratorBoard && (
                  <li className="nav-item">
                    <Link to={"/mod"} className="nav-link">
                      Moderator
                    </Link>
                  </li>
                )} */}

                {/* 
                {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/Admin"} className="nav-link">
                      Admin
                    </Link>
                  </li>
                )} */}


                {/* {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/DiagramFilm"} className="nav-link">
                      Diagram
                    </Link>
                  </li>
                )} */}

               


                {/* {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/Torles"} className="nav-link">
                      Törlés
                    </Link>
                  </li>
                )} */}


                {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/UjBlog"} className="nav-link">
                      Új blog
                    </Link>
                  </li>
                )}

                {currentUser && (
                  <li className="nav-item">
                    <Link to={"/user"} className="nav-link">
                      User
                    </Link>
                  </li>
                )}
              </div>


              {showAdminBoard && (<NavDropdown title="Törlések" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/torles">Törlés Csevegő</NavDropdown.Item>
                <NavDropdown.Item href="/torlesblog">Törlés Blog</NavDropdown.Item>
               


                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.5">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>)}
            </Nav>
            <Nav>
              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>


                </div>
              )}

            </Nav>
          </Navbar.Collapse>
        </Navbar>


        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />

            <Route path="/Admin" component={Admin} />
            <Route path="/Kereses" component={Kereses} />
            {/* <Route path="/Proba" component={Proba} /> */}
            {/* <Route path="/ProbaAdmin" component={ProbaAdmin}/> */}
            <Route path="/KeresSzoveg" component={KeresSzoveg} />
            <Route path="/DiagramFilm" component={DiagramFilm} />
            <Route path="/Torles" component={Torles} />
            <Route path="/Csevego" component={Csevego} />
            <Route path="/Blog" component={Blog} />
            <Route path="/TorlesBlog" component={BlogTorles} />
            <Route path="/UjBlog" component={UjBlog} />
            <Route path="/NoiEtrend" component={NoiEtrend} />
            <Route path="/FerfiEtrend" component={FerfiEtrend} />
          

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
