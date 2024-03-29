import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {colors} from './Cons'

import AuthService from "../services/auth.service";
import { Pressable } from "react-native-web";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container" style={{backgroundColor:colors.black}}>
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="username" style={{color:colors.feher}}></label>
              <Input
                type="text"
                className="form-control"
                name="username"
                placeholder="Username:"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
                style={{marginTop:40, marginBottom:40, backgroundColor:colors.szurke}}
                
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" style={{color:colors.feher}}></label>
              <Input
                type="password"
                placeholder="Password:"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
                style={{ marginBottom:40, backgroundColor:colors.szurke}}
              />
            </div>

            <div className="form-group">
              <Pressable
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
                style={({ pressed }) => ({
                  backgroundColor: pressed ? colors.black : colors.sotetlime,
                  elevation: pressed ? 2 : 0,
                  borderRadius: 8,
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 3,
                  height:35,
                  
                
                })}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm" ></span>
                )}
                <span style={{alignSelf:"center", marginTop:3}} >Login</span>
              </Pressable>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
