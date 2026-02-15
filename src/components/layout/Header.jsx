import React from "react";
import { Link } from "react-router-dom";
import { isLoggedIn, removeToken } from "../../utils/auth";
import { getCurrentDate } from "../../utils/formatDate";    
import logo from "../../assets/react.svg";
import { withTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";

/**
 * Header Component
 *
 * Renders the application header with:
 * - Logo
 * - Current date
 * - Navigation links (shown only if user is logged in)
 * - Logout button
 * - Language selector (EN/ES)
 *
 * @component
 */
class Header extends React.Component {
  /**
   * Header constructor
   * @param {Object} props - React props
   */
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: isLoggedIn(),         // whether the user is logged in
      currentDate: getCurrentDate(),  // current date string
      language: i18n.language,        // current selected language
    };
  }

  /**
   * Handles user logout
   * Removes the token, updates state, and redirects to login page
   */
  handleLogout = () => {
    removeToken();
    this.setState({ loggedIn: false });
    window.location.href = "/login";
  };

  /**
   * Lifecycle method: componentDidMount
   * Starts interval to update current date every minute
   */
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ currentDate: getCurrentDate() });
    }, 60000);
  }

  /**
   * Lifecycle method: componentWillUnmount
   * Clears the interval when component is removed
   */
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /**
   * Handles language change
   * @param {string} lang - Language code ('en' or 'es')
   */
  handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    this.setState({ language: lang });
  };

  /**
   * Renders the Header component
   * @returns {JSX.Element} JSX element representing the header
   */
  render() {
    const { t } = this.props; // translation function

    return (
      <header>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <span>{this.state.currentDate}</span>

        
      
        {this.state.loggedIn && (
          <nav>
            <Link to="/home">{t("nav.home")}</Link> |{" "}
            <Link to="/books">{t("nav.books")}</Link> |{" "}
            <Link to="/contacts">{t("nav.contacts")}</Link> |{" "}
            <button onClick={this.handleLogout}>{t("nav.logout")}</button>
          </nav>
        )}

        <select
          value={this.state.language}
          onChange={(e) => this.handleLanguageChange(e.target.value)}
        >
          <option value="en">EN</option>
          <option value="es">ES</option>
        </select>
      </header>
    );
  }
}

export default withTranslation()(Header);
