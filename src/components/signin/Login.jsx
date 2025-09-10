import React from "react";
import { login } from "../../services/api";
import { saveToken } from "../../utils/auth";
import { Navigate } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false,
      error: null,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(this.state.username, this.state.password);
      saveToken(data.token);
      this.setState({ redirect: true });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/home" />;
    }

    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <h2 className="login-title">Iniciar Sesión</h2>

        <input
          type="text"
          name="username"
          placeholder="User"
          value={this.state.username}
          onChange={this.handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
        />

        <button type="submit">Entrar</button>
        {this.state.error && <p>{this.state.error}</p>}
      </form>
    );
  }
}

export default LoginForm;
