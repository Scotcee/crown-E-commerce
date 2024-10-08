import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { auth } from "../../firebase/firebase.utils";

const Header = ({ currentUser }) => {
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <img className="logo" src={Logo} alt="Logo" width={"40%"} />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/contact">
          CONTACT US
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            {" "}
            SIGN IN
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
