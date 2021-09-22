import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import { withRouter } from 'react-router-dom'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      res: '',
      userName: "",
      userNameError: '',
      password: '',
      passwordError: ''
    }
    this.handleusernameChange = this.handleusernameChange.bind(this)
    this.handlepasswordChange = this.handlepasswordChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRegisterForm = this.handleRegisterForm.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleusernameChange(event) {
    this.setState({
      userName: event.target.value
    })
  }


  handlepasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  validate() {
    let userNameError = "";
    let passwordError = "";

    if (this.state.userName.length < 3) {
      userNameError = "UserName must contain atleast three characters"
    }

    if (userNameError) {
      this.setState({ userNameError });
      return false;
    }

    if (this.state.password.length < 8) {
      passwordError = "Password must contain atleast eight characters"
    }

    if (passwordError) {
      this.setState({ passwordError });
      return false;
    }

    return true;
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    const isValid = this.validate();
    let state_value = '';
    if (isValid) {
      await axios.post('http://localhost:8080/login', this.state)
        .then(response => {
          console.log(response)
          state_value = response.status
          if (state_value == 200) {
            console.log(response)
            localStorage.setItem('username', response.data.name)
            this.props.history.push('/');
          }
          localStorage.setItem("access-token", response.data.json_token);
        }).catch(error => {
          state_value = error.response.status
        });
    }
  };

  handleRegisterForm() {
    this.props.history.push('/register');
  }

  render() {
    return (
      <div className="login">
        <h2>Log in</h2>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text"
            value={this.state.userName}
            className="form-fields"
            placeholder="Username"
            onChange={this.handleusernameChange}
          /><div style={{ fontSize: 12, color: "red" }}>
            {this.state.userNameError}
          </div>

          <input type="password"
            className="form-fields"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlepasswordChange.bind(this)}
          /><div style={{ fontSize: 12, color: "red" }}>
            {this.state.passwordError}
          </div>
          <button className="button-login" type="submit">Log in</button>
        </form>
        <div className="or">OR</div>
        <button className="button-register" type="submit" onClick={this.handleRegisterForm}>Sign up</button>
      </div>
    )

  }

}
export default withRouter(Login)