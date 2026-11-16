import { Link } from "react-router-dom";
import clareLogo from "../assets/images/logo-clare.png";
import searchIcon from "../assets/icons/search-icon.png";

const Header = () => {
  return (
    <header id="main-header">
      <nav>
        <ul className="header-nav">
          <li>
            <Link to={"/"} className="logo-link">
              <img src={clareLogo} alt="Clare's blog logo" />
              Clare's Blog
            </Link>
          </li>
          <li>
            <span className="searchtab">
              <img src={searchIcon} alt="search icon" className="icon" />
              <input
                type="text"
                id="search"
                name="query"
                placeholder="Search Clare's Blog"
              />
            </span>
          </li>
          <span className="auth-btns">
            <Link to={"/login"} className="btn-login">
              Login
            </Link>
            <Link to={"/signup"} className="btn-signup">
              Signup
            </Link>
          </span>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
