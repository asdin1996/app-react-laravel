import React from "react";
import { login } from "../../services/api";
import { saveToken } from "../../utils/auth";
import { Navigate } from "react-router-dom";
import { withTranslation } from "react-i18next";

/**
 * LoginForm Component
 *
 * Renders a login form with:
 * - Username input
 * - Password input
 * - Submit button
 * - Error messages
 *
 * Supports internationalization (i18n)
 *
 * @component
 */
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

  /** Updates the state when inputs change */
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /** Handles form submission */
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

  /** Renders the login form */
  render() {
    const { t } = this.props;

    if (this.state.redirect) {
      return <Navigate to="/home" />;
    }

    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <h2 className="login-title">{t("login.title")}</h2>

        <input
          type="text"
          name="username"
          placeholder={t("login.username")}
          value={this.state.username}
          onChange={this.handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder={t("login.password")}
          value={this.state.password}
          onChange={this.handleChange}
        />

        <button type="submit">{t("login.submit")}</button>
        {this.state.error && <p>{t("login.error")}</p>}
      </form>
    );
  }
}

// Wrap withTranslation to provide `t` and react to language changes
export default withTranslation()(LoginForm);
