import React, { Component } from "react";
import {colors} from './Cons'
import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron card" style={{backgroundColor:colors.black, }}>
          <h3 style={{color:colors.feher, textAlign:"center"}}>Üdvözlet</h3>
        </header>
      </div>
    );
  }
}
