import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "./redux/actions/authentication";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.state, this.props.history);
  };

  render() {
    const { username, password } = this.state;
    if (this.props.user)
      return (
        <div>
          <Redirect to="/" />;
        </div>
      );
    return (
      <div
        className="col-6 mx-auto"
        style={{ borderRadius: "50px", backgroundColor: "black" }}
      >
        <div
          className="card my-5"
          style={{ borderRadius: "50px", backgroundColor: "black" }}
        >
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group change_color">
                <label htmlFor="username">Username</label>
                <br></br>

                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: "50px", textColor: "white" }}
                  id="username"
                  value={username}
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                />
                {this.props.errors ? this.props.errors : ""}
              </div>
              <div className="form-group change_color">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  style={{ borderRadius: "50px", textColor: "white" }}
                  id="password"
                  value={password}
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
                {this.props.errors ? this.props.errors : ""}
              </div>
              <br />
              <center>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ borderRadius: "50px", fontWeight: "bold" }}
                >
                  Login
                </button>
                <Link to="/signup" className="btn btn-link my-2 my-sm-0">
                  Signup for an account
                </Link>{" "}
              </center>
              <br />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (userData, history) => dispatch(login(userData, history))
});

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
