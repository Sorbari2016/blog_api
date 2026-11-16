import { Link } from "react-router-dom";
import homeIcon from "../assets/icons/home-icon.png";
import postIcon from "../assets/icons/posts-icon.png";
import pubishedIcon from "../assets/icons/world.png";
import unpublishedIcon from "../assets/icons/unpublished-icon.png";
import trashicon from "../assets/icons/trash-bin.png";

const Sidebar = () => {
  return (
    <aside id="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to={"/"} className="nav-link">
              <img src={homeIcon} alt="home icon" className="icon" />
              Home
            </Link>
          </li>
          <li>
            <Link to={"posts"} className="nav-link">
              <img src={postIcon} alt="posts icon" className="icon" />
              All Posts
            </Link>
          </li>
          <li>
            <Link to={"published"} className="nav-link">
              <img src={pubishedIcon} alt="published icon" className="icon" />
              Published Posts
            </Link>
          </li>
          <li>
            <Link to={"unpublished"} className="nav-link">
              <img
                src={unpublishedIcon}
                alt="unpublished icon"
                className="icon"
              />
              Unpublished Posts
            </Link>
          </li>
          <li>
            <Link to={"trash"} className="nav-link">
              <img src={trashicon} alt="trash icon" className="icon" />
              Trash
            </Link>
          </li>
        </ul>
      </nav>
      <div className="sidebar-cta">
        <button className="btn btn-create" type="button">
          <Link to={"posts"}>Create</Link>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
