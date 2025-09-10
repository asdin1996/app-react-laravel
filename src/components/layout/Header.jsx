import React from "react";
import { Link } from "react-router-dom";
import { isLoggedIn, removeToken } from "../../utils/auth";
import { getCurrentDate } from "../../utils/formatDate";    
import logo from "../../assets/react.svg";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: isLoggedIn(),
      currentDate: getCurrentDate(),
    };
  }

  handleLogout = () => {
    removeToken();
    this.setState({ loggedIn: false });
    window.location.href = "/login";
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ currentDate: getCurrentDate() });
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <header>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <span>{this.state.currentDate}</span>

        {this.state.loggedIn && (
          <nav>
            <Link to="/home">Home</Link> |{" "}
            <Link to="/books">Books</Link> |{" "}
            <Link to="/contacts">Contacts</Link> |{" "}
            <button onClick={this.handleLogout}>Logout</button>
          </nav>
        )}
      </header>
    );
  }
}

export default Header;
